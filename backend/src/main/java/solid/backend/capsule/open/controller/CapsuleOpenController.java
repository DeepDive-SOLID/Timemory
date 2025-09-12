package solid.backend.capsule.open.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import solid.backend.capsule.open.dto.CapsuleCndtOpenDto;
import solid.backend.capsule.open.dto.CapsuleDateOpenDto;
import solid.backend.capsule.open.dto.CapsuleLtOpenDto;
import solid.backend.capsule.open.service.CapsuleOpenService;

import java.util.List;

@Controller
@RequiredArgsConstructor
@RequestMapping("/api/capsule/open")
public class CapsuleOpenController {
    private final CapsuleOpenService capsuleOpenService;

    /**
     * 설명: 날짜 캡슐 오픈 처리 후 캡슐 데이터 반환
     * @param capId
     * @return List<CapsuleDateOpenDto>
     */
    @ResponseBody
    @PostMapping("/date")
    public List<CapsuleDateOpenDto> getCapsuleDateList(@RequestBody Integer capId) {
        return capsuleOpenService.getCapsuleDateList(capId);
    }

    /**
     * 설명: 조건 캡슐 오픈 후 캡슐 데이터 반환
     * @param capId
     * @return List<CapsuleCndtOpenDto>
     */
    @ResponseBody
    @PostMapping("/cndt")
    public List<CapsuleCndtOpenDto> getCapsuleCndtList(@RequestBody Integer capId) {
        return capsuleOpenService.getCapsuleCndtList(capId);
    }

    /**
     * 설명: 위치 캡슐 오픈 후 캡슐 데이터 반환
     * @param capId
     * @return List<CapsuleLtOpenDto>
     */
    @ResponseBody
    @PostMapping("/lt")
    public List<CapsuleLtOpenDto> getCapsuleLtList(@RequestBody Integer capId) {
        return capsuleOpenService.getCapsuleLtList(capId);
    }
}
