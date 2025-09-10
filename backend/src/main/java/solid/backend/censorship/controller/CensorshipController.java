package solid.backend.censorship.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import solid.backend.censorship.service.CensorshipService;

@Controller
@RequiredArgsConstructor
@RequestMapping("/api/censorship")
public class CensorshipController {

    private final CensorshipService censorshipService;

    /**
     * 설명 : 캡슐 내용 검열
     * @param content
     * @return ResponseEntity<Boolean>
     */
    @PostMapping("/checkContent")
    public ResponseEntity<Boolean> checkContent(@RequestBody String content) {
        boolean isDuplicate = censorshipService.checkContent(content);
        return ResponseEntity.ok(isDuplicate);
    }
}
