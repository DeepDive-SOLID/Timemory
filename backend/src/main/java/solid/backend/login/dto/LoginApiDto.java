package solid.backend.login.dto;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Getter
@Setter
@Configuration
@ConfigurationProperties(prefix = "oauth")
public class LoginApiDto {

    private Kakao kakao;

    @Getter
    @Setter
    public static class Kakao {
        private String clientId;
        private String clientSecret;
    }
}
