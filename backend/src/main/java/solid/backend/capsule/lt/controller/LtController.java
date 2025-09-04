package solid.backend.capsule.lt.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import solid.backend.capsule.lt.dto.LtAddDto;
import solid.backend.capsule.lt.dto.LtListDto;
import solid.backend.capsule.lt.service.LtService;

import java.util.List;

@Controller
@RequiredArgsConstructor
@RequestMapping("/api/capsule/lt")
public class LtController {

    private final LtService ltService;

    /**
     * 설명 : 캡슐 위치 리스트 정보
     * @param teamId
     * @return List<LtListDto>
     */
    @ResponseBody
    @PostMapping("/getLtList")
    public List<LtListDto> getLtList(@RequestBody Integer teamId) {
        return ltService.getLtList(teamId);
    }

    /**
     * 설명 : 캡슐 위치 정보 추가
     * @param ltDto
     * @return ResponseEntity<String>
     */
    @PostMapping("/addLtDto")
    public ResponseEntity<String> addLtDto(@ModelAttribute LtAddDto ltDto) {
        try {
            ltService.addLtDto(ltDto);
            return ResponseEntity.ok("SUCCESS");

        // 사용자가 잘못 입력한 경우 (ex: 파일 크기 초과 등)
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());

        // 그 외 서버 오류
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("FAIL");
        }
    }
}
