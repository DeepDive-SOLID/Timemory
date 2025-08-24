package solid.backend.message.service;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

@Service
@RequiredArgsConstructor
public class MessageServiceImpl implements MessageService{
    private final RestTemplate restTemplate = new RestTemplate();

    /**
     * 설명: 카카오톡 메시지 보내기
     * @param accessToken
     * @param message
     * @return String (메시지를 보내기 위한 템플릿 바디)
     */
    public String sendMessage(String accessToken, String message) {
        String url = "https://kapi.kakao.com/v2/api/talk/memo/default/send";

        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(accessToken);
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

        MultiValueMap<String, String> body = new LinkedMultiValueMap<>();
        body.add("template_object", "{"
                + "\"object_type\":\"text\","
                + "\"text\":\"" + message + "\","
                + "\"link\":{\"web_url\":\"https://developers.kakao.com\"}" // 테스트를 위한 링크 (추후 실제 서비스 링크로 넣어서 사용해야됨)
                + "}");

        HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(body, headers);

        ResponseEntity<String> response = restTemplate.postForEntity(url, request, String.class);

        return response.getBody();
    }
}
