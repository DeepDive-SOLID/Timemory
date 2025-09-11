package solid.backend.capsule.detail.service;

import solid.backend.capsule.detail.dto.CapsuleDetailDto;

public interface CapsuleDetailService {

    /**
     * 설명 : 캡슐 상세 조회
     * @param capsuleId
     * @return CapsuleDetailDto
     */
    CapsuleDetailDto getCapsuleDetail(Integer capsuleId);
}
