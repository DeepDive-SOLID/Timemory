package solid.backend.Jwt;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import solid.backend.util.TokenStore;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/token")
public class JwtController {

    private final JwtUtil jwtUtil;
    private final TokenStore tokenStore;

    /**
     * 설명: refresh token을 활용하여 access token 재발급
     * @return ResponseEntity
     */
    @PostMapping("/refresh")
    public ResponseEntity<?> refreshAccessToken() {
        String refreshToken = tokenStore.getRefreshToken();

        if (refreshToken == null || !jwtUtil.validateToken(refreshToken)) {
            return ResponseEntity.status(401).body("Refresh Token이 유효하지 않습니다. 다시 로그인하세요.");
        }

        String memberId = jwtUtil.getMemberId(refreshToken);

        String newAccessToken = jwtUtil.createAccessToken(
                AccessToken.builder()
                        .memberId(memberId)
                        .build()
        );

        return ResponseEntity.ok(newAccessToken);
    }
}
