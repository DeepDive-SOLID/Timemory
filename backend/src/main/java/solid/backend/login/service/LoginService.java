package solid.backend.login.service;

import jakarta.servlet.http.HttpServletRequest;
import solid.backend.login.dto.LoginDto;

public interface LoginService {

    /**
     * 설명 : 카카오 로그인
     * @param code
     * @param request
     * @return LoginDto
     */
    LoginDto loginKakao(String code, HttpServletRequest request);

    /**
     * 설명: 로그인 시 토큰 발급
     * @param memberId
     * @param request
     * @return String
     */
    String login(String memberId, HttpServletRequest request);

    /**
     * 설명: 닉네임 중복 확인
     * @param checkInfo
     * @return Boolean
     */
    Boolean isDuplicatedNickname(LoginDto checkInfo);
}
