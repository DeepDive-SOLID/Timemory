package solid.backend.login.service;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.http.*;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;
import solid.backend.Jwt.AccessToken;
import solid.backend.Jwt.JwtUtil;
import solid.backend.entity.Member;
import solid.backend.jpaRepository.MemberRepository;
import solid.backend.login.dto.LoginApiDto;
import solid.backend.login.dto.LoginDto;

import java.time.LocalDate;
import java.util.Map;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class LoginServiceImpl implements LoginService {

    private final LoginApiDto loginApiDto;
    private final MemberRepository loginRepository;
    private final JwtUtil jwtUtil;

    /**
     * 설명 : 카카오 로그인
     * @param code
     * @param request
     * @return LoginDto
     */
    @Override
    public LoginDto loginKakao(String code, HttpServletRequest request) {

        // 1. 엑세스 토큰 요청
        String kakaoTokenUrl = "https://kauth.kakao.com/oauth/token";
        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders tokenHeaders = new HttpHeaders();
        tokenHeaders.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

        MultiValueMap<String, String> tokenParams = new LinkedMultiValueMap<>();
        tokenParams.add("grant_type", "authorization_code");
        tokenParams.add("client_id", loginApiDto.getKakao().getClientId());
        tokenParams.add("redirect_uri", "http://localhost:5173/login/kakao/callback");
        tokenParams.add("code", code);

        HttpEntity<MultiValueMap<String, String>> tokenRequest = new HttpEntity<>(tokenParams, tokenHeaders);
        ResponseEntity<Map> tokenResponse = restTemplate.postForEntity(kakaoTokenUrl, tokenRequest, Map.class);

        if (tokenResponse.getStatusCode() != HttpStatus.OK) {
            throw new RuntimeException("카카오 액세스 토큰을 가져오지 못했습니다.");
        }

        String accessToken = (String) tokenResponse.getBody().get("access_token");

        // 2. 사용자 정보 요청
        String userInfoUrl = "https://kapi.kakao.com/v2/user/me";
        HttpHeaders userInfoHeaders = new HttpHeaders();
        userInfoHeaders.setBearerAuth(accessToken);

        HttpEntity<Void> userInfoRequest = new HttpEntity<>(userInfoHeaders);
        ResponseEntity<Map> userInfoResponse = restTemplate.exchange(userInfoUrl, HttpMethod.GET, userInfoRequest, Map.class);

        if (userInfoResponse.getStatusCode() != HttpStatus.OK) {
            throw new RuntimeException("카카오 사용자 정보를 가져오지 못했습니다.");
        }

        Map<String, Object> body = userInfoResponse.getBody();
        Map<String, Object> kakaoAccount = (Map<String, Object>) body.get("kakao_account");

        // 고유 id
        String id = String.valueOf(body.get("id"));

        // 이름이 없으면 닉네임으로 대체
        String name = (String) kakaoAccount.get("name");
        Map<String, Object> profile = (Map<String, Object>) kakaoAccount.get("profile");
        if (name == null && profile != null) name = (String) profile.get("nickname");
        final String newName = name;

        // 생년월일
        String birthDay = (String) kakaoAccount.get("birthday");
        String birthYear = (String) kakaoAccount.get("birthyear");
        final LocalDate newBirth = (birthDay != null && birthYear != null &&
                birthDay.length() == 4 && birthYear.length() == 4)
                ? LocalDate.of(
                Integer.parseInt(birthYear),
                Integer.parseInt(birthDay.substring(0, 2)),
                Integer.parseInt(birthDay.substring(2, 4))
        )
                : null;

        // 전화번호
        // 국제번호는 국내 번호로 데이터 변환
        String phone = (String) kakaoAccount.get("phone_number");
        if (phone != null) phone = phone.replace("+82 ", "0");
        final String newPhone = phone;

        // 이메일
        final String email = (String) kakaoAccount.get("email");

        // 프로필 이미지
        final String newProfileImage = (profile != null)
                ? (String) profile.get("profile_image_url")
                : null;

        // 3. 회원 정보 확인 및 없으면 등록
        Member member = loginRepository.findById(id)
                .orElseGet(() -> {
                    Member newMember = Member.builder()
                            .memberId(id)
                            .memberName(newName)
                            .memberBirth(newBirth)
                            .memberPhone(newPhone)
                            .memberEmail(email)
                            .memberProfile(newProfileImage)
                            .build();
                    return loginRepository.save(newMember);
                });

        // 4. 회원의 닉네임 값 반환
        return new LoginDto(member.getMemberId(), member.getMemberNickname());
    }

    /**
     * 설명: 로그인 시 토큰 발급
     * @param memberId
     * @param request
     * @return String
     */
    @Override
    public String login(String memberId, HttpServletRequest request) {

        // 1. 사용자 조회
        Optional<Member> optionalMember = loginRepository.findById(memberId);
        if (optionalMember.isEmpty()) {
            throw new UsernameNotFoundException("존재하지 않는 사용자입니다.");
        }

        Member member = optionalMember.get();

        // 2. 토큰에 담을 최소한의 사용자 정보 구성
        AccessToken dto = AccessToken.builder()
                .memberId(member.getMemberId())
                .build();

        // 3. JWT 발급
        String accessToken = jwtUtil.createAccessToken(dto);

        // refreshToken은 백엔드에서 저장 필요.
        String refreshToken = jwtUtil.createRefreshToken(dto);

        System.out.println("accessToken: " + accessToken);
        System.out.println("refreshToken: " + refreshToken);


        // 세션에 refreshToken 저장
        HttpSession session = request.getSession(true);
        session.setAttribute("refreshToken", refreshToken);

        // 5. access token 반환
        return accessToken;
    }

    /**
     * 설명: 닉네임 중복 확인
     * @param checkInfo
     * @return Boolean (중복이면 true, 아니면 false)
     */
    @Override
    public Boolean isDuplicatedNickname(LoginDto checkInfo) {

        // 1. 닉네임 중복 체크
        boolean isDuplicated = loginRepository.findByMemberNickname(checkInfo.getMemberNickname()).isPresent();
        if (isDuplicated) {
            return true;
        }

        // 2. 중복 아니면 해당 멤버 조회
        Member member = loginRepository.findById(checkInfo.getMemberId())
                .orElseThrow(() -> new RuntimeException("해당 회원을 찾을 수 없습니다."));

        // 3. 닉네임 저장
        member.setMemberNickname(checkInfo.getMemberNickname());
        loginRepository.save(member);

        return false;
    }
}
