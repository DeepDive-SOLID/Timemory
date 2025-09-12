package solid.backend.util;

import org.springframework.stereotype.Component;

@Component
public class TokenStore {
    private String accessToken;
    private String memberId;

    public void saveAccessToken(String accessToken) {
        this.accessToken = accessToken;
    }

    public String getAccessToken() {
        return accessToken;
    }

    public boolean hasToken() {
        return accessToken != null;
    }

    public void saveRefreshToken(String refreshToken) {
        this.accessToken = refreshToken;
    }

    public String getRefreshToken() {
        return accessToken;
    }

    public void saveMemberId(String memberId) {
        this.memberId = memberId;
    }

    public String getMemberId() {
        return memberId;
    }

    public boolean hasMemberId() {
        return memberId != null;
    }
}
