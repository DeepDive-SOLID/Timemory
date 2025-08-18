package solid.backend.test;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Profile;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import solid.backend.Jwt.AccessToken;
import solid.backend.Jwt.JwtUtil;
import solid.backend.entity.Member;
import solid.backend.jpaRepository.MemberRepository;

import jakarta.annotation.PostConstruct;
import java.util.Map;

/**
 * 개발/테스트 환경용 인증 컨트롤러
 * 실제 카카오 OAuth 없이 JWT 토큰 발급 가능
 * 
 * WARNING: 프로덕션 환경에서는 절대 사용하지 마세요!
 * @Profile("local") 또는 @Profile("test")로 제한됨
 */
@RestController
@RequestMapping("/api/test/auth")
@RequiredArgsConstructor
@Profile({"local", "test"})  // local 또는 test 프로파일에서만 활성화
@Slf4j
public class TestAuthController {
    
    private final MemberRepository memberRepository;
    private final JwtUtil jwtUtil;
    
    @PostConstruct
    public void init() {
        log.info("TestAuthController initialized - Test endpoints are available at /api/test/auth");
    }
    
    /**
     * 테스트용 JWT 토큰 발급
     * 실제 카카오 인증 없이 회원 ID로 토큰 발급
     * 
     * @param request 회원 ID를 포함한 요청
     * @return JWT 액세스 토큰
     */
    @PostMapping("/token")
    public ResponseEntity<?> generateTestToken(@RequestBody Map<String, String> request) {
        String memberId = request.get("memberId");
        
        if (memberId == null || memberId.isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of(
                "error", "memberId is required"
            ));
        }
        
        // 회원 존재 확인
        Member member = memberRepository.findById(memberId)
                .orElse(null);
        
        if (member == null) {
            // 테스트를 위해 회원이 없으면 자동 생성
            member = Member.builder()
                    .memberId(memberId)
                    .memberName("테스트유저")
                    .memberNickname("test_" + memberId.substring(Math.max(0, memberId.length() - 6)))
                    .build();
            member = memberRepository.save(member);
        }
        
        // JWT 토큰 생성
        AccessToken accessToken = AccessToken.builder()
                .memberId(member.getMemberId())
                .build();
        
        String token = jwtUtil.createAccessToken(accessToken);
        
        return ResponseEntity.ok(Map.of(
            "accessToken", token,
            "memberId", member.getMemberId(),
            "nickname", member.getMemberNickname(),
            "message", "TEST MODE - DO NOT USE IN PRODUCTION"
        ));
    }
    
    /**
     * 테스트용 회원 생성
     * 
     * @param request 회원 정보
     * @return 생성된 회원 정보
     */
    @PostMapping("/member")
    public ResponseEntity<?> createTestMember(@RequestBody Map<String, String> request) {
        String memberId = request.get("memberId");
        String nickname = request.get("nickname");
        String name = request.get("name");
        
        if (memberId == null || memberId.isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of(
                "error", "memberId is required"
            ));
        }
        
        // 이미 존재하는지 확인
        if (memberRepository.existsById(memberId)) {
            return ResponseEntity.badRequest().body(Map.of(
                "error", "Member already exists"
            ));
        }
        
        Member member = Member.builder()
                .memberId(memberId)
                .memberName(name != null ? name : "테스트유저")
                .memberNickname(nickname != null ? nickname : "test_" + memberId.substring(Math.max(0, memberId.length() - 6)))
                .build();
        
        member = memberRepository.save(member);
        
        return ResponseEntity.ok(Map.of(
            "memberId", member.getMemberId(),
            "nickname", member.getMemberNickname(),
            "name", member.getMemberName()
        ));
    }
}