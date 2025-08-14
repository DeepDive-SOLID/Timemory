package solid.backend.capsule.cndt.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import solid.backend.capsule.cndt.dto.CapsuleCndtDto;
import solid.backend.capsule.cndt.dto.CapsuleListDto;
import solid.backend.capsule.cndt.service.CapsuleCndtService;

import java.util.List;

@Controller
@RequiredArgsConstructor
@RequestMapping("/api/capsule/cndt")
public class CapsuleCndtController {
    private final CapsuleCndtService capsuleCndtService;

    /**
     * 설명: 캡슐 조회
     * @param teamId
     * @return List<CapsuleListDto>
     */
    @ResponseBody
    @PostMapping("/list")
    public List<CapsuleListDto> getCapsuleList(@RequestBody Integer teamId) {
        return capsuleCndtService.getCapsuleList(teamId);
    }

    /**
     * 설명: 조건 캡슐 생성
     * @param capsuleCndtDto
     * @return ResponseEntity<String>
     */
    @ResponseBody
    @PostMapping("/create")
    public ResponseEntity<String> createCapsuleDate(@ModelAttribute CapsuleCndtDto capsuleCndtDto) {
        try {
            capsuleCndtService.createCapsuleDate(capsuleCndtDto);
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
            capsuleCndtService.deleteCapsuleDate(capId);
            return ResponseEntity.ok("SUCCESS");
        } catch (Exception e) {
            e.printStackTrace();
            return   ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("FAIL");
        }
    }
}
