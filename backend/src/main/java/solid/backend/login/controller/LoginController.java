package solid.backend.login.controller;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import solid.backend.login.dto.LoginDto;
import solid.backend.login.service.LoginService;

@Controller
@RequiredArgsConstructor
@RequestMapping("/api/login")
public class LoginController {

    private final LoginService loginService;

    /**
     * 설명 : 카카오 로그인
     * @param code
     * @param request
     * @return ResponseEntity<?>
     */
    @GetMapping("/kakao")
    public ResponseEntity<?> loginKakao(@RequestParam("code") String code, HttpServletRequest request) {
        try {
            LoginDto nickname = loginService.loginKakao(code, request);
            return ResponseEntity.ok(nickname);
        } catch (UsernameNotFoundException | BadCredentialsException e) {
            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .body("LOGIN_FAIL: " + e.getMessage());
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("LOGIN_ERROR: 알 수 없는 오류가 발생했습니다.");
        }
    }

    /**
     * 설명: 로그인 시 토큰 발급
     * @param memberId
     * @return ResponseEntity<String>
     */
    @PostMapping
    public ResponseEntity<String> login(@RequestBody String memberId, HttpServletRequest request) {
        try {
            String token = loginService.login(memberId, request);
            return ResponseEntity.ok(token);
        } catch (UsernameNotFoundException | BadCredentialsException e) {
            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .body("LOGIN_FAIL: " + e.getMessage());
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("LOGIN_ERROR: 알 수 없는 오류가 발생했습니다.");
        }
    }

    /**
     * 설명: 닉네임 중복 확인
     * @param checkInfo
     * @return ResponseEntity<Boolean> (아이디가 있으면 true, 없으면 false)
     */
    @PostMapping("/checkNickname")
    public ResponseEntity<Boolean> checkNickname(@RequestBody LoginDto checkInfo) {
        boolean isDuplicate = loginService.isDuplicatedNickname(checkInfo);
        return ResponseEntity.ok(isDuplicate);
    }

    /**
     * 설명: 로그아웃 (세션에 저장된 refresh token 삭제)
     * @param request
     * @return ResponseEntity<String>
     */
    @PostMapping("/logout")
    public ResponseEntity<String> logout(HttpServletRequest request) {
        HttpSession session = request.getSession(false);
        if (session != null) {
            session.removeAttribute("refreshToken");
        }
        return ResponseEntity.ok("로그아웃되었습니다.");
    }

}
