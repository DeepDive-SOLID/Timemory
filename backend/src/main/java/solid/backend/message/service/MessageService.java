package solid.backend.message.service;

public interface MessageService {
    /**
     * 설명: 카카오톡 메시지 보내기
     * @param accessToken
     * @param message
     * @return String
     */
    String sendMessage(String accessToken, String message);
}
