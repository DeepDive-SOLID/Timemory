package solid.backend.capsule.detail.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import solid.backend.capsule.detail.dto.CapsuleDetailDto;
import solid.backend.capsule.detail.service.CapsuleDetailService;

@Controller
@RequiredArgsConstructor
@RequestMapping("/api/capsule/detail")
public class CapsuleDetailController {

    private final CapsuleDetailService capsuleDetailService;

    /**
     * 설명 : 캡슐 상세 조회
     * @param capsuleId
     * @return CapsuleDetailDto
     */
    @ResponseBody
    @PostMapping
    public CapsuleDetailDto getCapsuleDetail(@RequestBody Integer capsuleId) {
        return capsuleDetailService.getCapsuleDetail(capsuleId);
    }
}
