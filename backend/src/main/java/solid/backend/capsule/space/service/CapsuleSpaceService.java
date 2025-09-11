package solid.backend.capsule.space.service;

import solid.backend.capsule.space.dto.CapsuleSpaceResponseDto;

public interface CapsuleSpaceService {
    
    /**
     * 사용자의 캡슐 공간을 조회합니다.
     * @param memberId 사용자 ID
     * @return 캡슐 공간 정보
     */
    CapsuleSpaceResponseDto getCapsuleSpace(String memberId);
    
    /**
     * 캡슐을 삭제합니다.
     * @param memberId 사용자 ID
     * @param capsuleId 캡슐 ID
     */
    void deleteCapsule(String memberId, Integer capsuleId);
}