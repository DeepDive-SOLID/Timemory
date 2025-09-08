package solid.backend.open.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import solid.backend.open.dto.OpenCapsuleAddDto;
import solid.backend.open.dto.OpenCapsuleListDto;
import solid.backend.open.dto.OpenListDto;
import solid.backend.open.service.OpenService;

import java.util.List;

@Controller
@RequiredArgsConstructor
@RequestMapping("/api/open")
public class OpenController {

    private final OpenService openService;

    /**
     * 설명 : 오픈 그룹 리스트 정보
     * @return List<OpenDto>
     */
    @ResponseBody
    @GetMapping("/getOpenList")
    public List<OpenListDto> getOpenList() {
        return openService.getOpenList();
    }

    /**
     * 설명 : 오픈 그룹 캡슐 리스트 정보
     * @param teamId
     * @return List<OpenCapsuleListDto>
     */
    @ResponseBody
    @PostMapping("/getOpenCapsuleList")
    public List<OpenCapsuleListDto> getOpenCapsuleList(@RequestBody Integer teamId) {
        return openService.getOpenCapsuleList(teamId);
    }


    /**
     * 설명 : 오픈 그룹 캡슐 추가
     * @param capsuleDto
     * @return ResponseEntity<String>
     */
    @PostMapping("/addOpenCapsuleDto")
    public ResponseEntity<String> addOpenCapsuleDto(@ModelAttribute OpenCapsuleAddDto capsuleDto) {
        try {
            openService.addOpenCapsuleDto(capsuleDto);
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
