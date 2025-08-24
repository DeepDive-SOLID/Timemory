package solid.backend.message.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import solid.backend.message.service.MessageService;

@Controller
@RequestMapping("/api/message")
public class MessageController {
    private final MessageService messageService;

    public MessageController(MessageService messageService) {
        this.messageService = messageService;
    }

    // 토큰만 받아서 메시지 발송
    @PostMapping("/send")
    public ResponseEntity<String> sendMessage(@RequestHeader("Authorization") String authorization) {

        String accessToken = authorization.replace("Bearer ", "");
        String message = "캡슐이 열렸습니다 !! \\n서비스를 통해 확인해주세요."; // 고정 메시지

        String result = messageService.sendMessage(accessToken, message);
        return ResponseEntity.ok(result);
    }
}
