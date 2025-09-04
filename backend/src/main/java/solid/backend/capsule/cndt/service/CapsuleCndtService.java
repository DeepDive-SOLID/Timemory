package solid.backend.capsule.cndt.service;

import solid.backend.capsule.cndt.dto.CapsuleCndtDto;
import solid.backend.capsule.cndt.dto.CapsuleListDto;

import java.util.List;

public interface CapsuleCndtService {
    /**
     * 설명: 조건 캡슐 조회
     * @param teamId
     * @return List<CapsuleListDto>
     */
    List<CapsuleListDto> getCapsuleList(Integer teamId);

    /**
     * 설명: 조건 캡슐 생성
     * @param capsuleCndtDto
     */
    void createCapsuleDate(CapsuleCndtDto capsuleCndtDto);

    /**
     * 설명: 캡슐 삭제
     * @param capId
     */
    void deleteCapsuleDate(Integer capId);
}
