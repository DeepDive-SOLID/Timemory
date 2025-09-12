package solid.backend.common;

import jakarta.servlet.http.HttpSession;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;
import solid.backend.util.TokenStore;

import java.util.List;
import java.util.Map;

@Component
public class KakaoMessage {
    private final TokenStore tokenStore;

    public KakaoMessage(TokenStore tokenStore) {
        this.tokenStore = tokenStore;
    }

    public void sendMessage(String text) {
        String url = "https://kapi.kakao.com/v2/api/talk/memo/default/send";
        String accessToken = tokenStore.getAccessToken();
        RestTemplate restTemplate = new RestTemplate();

        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + accessToken);
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

        String payload = "{"
                + "\"object_type\":\"text\","
                + "\"text\":\"" + text + "\","
                + "\"link\":{\"web_url\":\" http://timemory.kro.kr/\"}"
                + "}";

        HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(
                new LinkedMultiValueMap<>(Map.of("template_object", List.of(payload))),
                headers
        );

        ResponseEntity<String> response = restTemplate.postForEntity(url, request, String.class);

        System.out.println("카카오톡 전송 결과: " + response.getBody());
    }
}
