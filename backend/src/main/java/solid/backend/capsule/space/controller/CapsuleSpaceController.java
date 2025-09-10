package solid.backend.capsule.space.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import solid.backend.capsule.space.dto.CapsuleSpaceResponseDto;
import solid.backend.capsule.space.service.CapsuleSpaceService;

@RestController
@RequestMapping("/api/capsule-space")
@RequiredArgsConstructor
public class CapsuleSpaceController {
    
    private final CapsuleSpaceService capsuleSpaceService;
    
    /**
     * 캡슐 공간 조회 API
     * 사용자가 작성한 모든 캡슐을 조회합니다.
     * 
     * @param memberId JWT에서 추출한 사용자 ID
     * @return 캡슐 공간 정보 (캡슐 목록 포함)
     */
    @GetMapping
    public ResponseEntity<CapsuleSpaceResponseDto> getCapsuleSpace(
            @AuthenticationPrincipal String memberId) {
        CapsuleSpaceResponseDto response = capsuleSpaceService.getCapsuleSpace(memberId);
        return ResponseEntity.ok(response);
    }
    
    /**
     * 캡슐 삭제 API
     * 사용자가 작성한 캡슐을 삭제합니다.
     * 
     * @param memberId JWT에서 추출한 사용자 ID
     * @param capsuleId 삭제할 캡슐 ID
     * @return 삭제 성공 여부
     */
    @DeleteMapping("/{capsuleId}")
    public ResponseEntity<Void> deleteCapsule(
            @AuthenticationPrincipal String memberId,
            @PathVariable("capsuleId") Integer capsuleId) {
        capsuleSpaceService.deleteCapsule(memberId, capsuleId);
        return ResponseEntity.noContent().build();
    }
}