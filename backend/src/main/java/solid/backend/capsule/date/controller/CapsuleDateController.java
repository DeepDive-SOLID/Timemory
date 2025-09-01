package solid.backend.capsule.date.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import solid.backend.capsule.date.dto.CapsuleDateDto;
import solid.backend.capsule.date.dto.CapsuleListDto;
import solid.backend.capsule.date.service.CapsuleDateService;

import java.util.List;

@Controller
@RequiredArgsConstructor
@RequestMapping("/api/capsule/date")
public class CapsuleDateController {
    private final CapsuleDateService capsuleDateService;

    /**
     * 설명: 캡슐 조회
     * @param teamId
     * @return List<CapsuleListDto>
     */
    @ResponseBody
    @PostMapping("/list")
    public List<CapsuleListDto> getCapsuleList(@RequestBody Integer teamId) {
        return capsuleDateService.getCapsuleList(teamId);
    }

    /**
     * 설명: 날짜 캡슐 생성
     * @param capsuleDateDto
     * @return ResponseEntity<String>
     */
    @ResponseBody
    @PostMapping("/create")
    public ResponseEntity<String> createCapsuleDate(@ModelAttribute CapsuleDateDto capsuleDateDto) {
        try {
            capsuleDateService.createCapsuleDate(capsuleDateDto);
            return ResponseEntity.ok("SUCCESS");

        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("FAIL");
        }
    }

    /**
     * 설명: 캡슐 삭제
     * @param capId
     * @return ResponseEntity<String>
     */
    @ResponseBody
    @DeleteMapping("/delete")
    public ResponseEntity<String> deleteCapsuleDate(@RequestBody Integer capId) {
        try {
            capsuleDateService.deleteCapsuleDate(capId);
            return ResponseEntity.ok("SUCCESS");
        } catch (Exception e) {
            e.printStackTrace();
            return   ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("FAIL");
        }
    }
}
