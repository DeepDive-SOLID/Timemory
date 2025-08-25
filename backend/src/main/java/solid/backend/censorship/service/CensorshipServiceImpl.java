package solid.backend.censorship.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
@Slf4j
public class CensorshipServiceImpl implements CensorshipService {

    private static final String PERSPECTIVE_API_URL = "https://commentanalyzer.googleapis.com/v1alpha1/comments:analyze";

    @Value("${censorship.perspective.api-key}")
    private String apiKey;

    private final RestTemplate restTemplate = new RestTemplate();
    private final ObjectMapper mapper = new ObjectMapper();

    /**
     * 설명 : 캡슐 내용 검열
     * @param content
     * @return Boolean(통과하면 false, 검열되면 true)
     */
    @Override
    public Boolean checkContent(String content) {
        try {
            // JSON Request Body
            Map<String, Object> requestBody = Map.of(
                    "comment", Map.of("text", content),
                    "languages", List.of("ko"),
                    "requestedAttributes", Map.of(
                            "TOXICITY", Map.of(),
                            "INSULT", Map.of(),
                            "PROFANITY", Map.of()
                    )
            );

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);

            HttpEntity<Map<String, Object>> entity = new HttpEntity<>(requestBody, headers);

            // API 호출
            ResponseEntity<String> response = restTemplate.exchange(
                    PERSPECTIVE_API_URL + "?key=" + apiKey,
                    HttpMethod.POST,
                    entity,
                    String.class
            );

            // 결과 파싱
            JsonNode root = mapper.readTree(response.getBody());

            // 각 속성별 점수 확인
            // 공격적/유해한 언어
            double toxicity = root.path("attributeScores").path("TOXICITY").path("summaryScore").path("value").asDouble(0.0);
            // 모욕적인 언어
            double insult = root.path("attributeScores").path("INSULT").path("summaryScore").path("value").asDouble(0.0);
            // 일반적인 욕설/저속한 언어
            double profanity = root.path("attributeScores").path("PROFANITY").path("summaryScore").path("value").asDouble(0.0);

            log.info("TOXICITY={}, INSULT={}, PROFANITY={}", toxicity, insult, profanity);

            // 기준치 (0.7 이상이면 검열)
            return toxicity >= 0.7 || insult >= 0.7 || profanity >= 0.7;

        } catch (Exception e) {
            log.error("Perspective API 호출 실패: {}", e.getMessage(), e);

            // API 장애 시 기본적으로 검열하지 않음 (false 반환)
            return false;
        }
    }
}
