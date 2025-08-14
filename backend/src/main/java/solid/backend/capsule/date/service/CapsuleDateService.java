package solid.backend.capsule.date.service;

import solid.backend.capsule.date.dto.CapsuleDateDto;
import solid.backend.capsule.date.dto.CapsuleListDto;

import java.util.List;

public interface CapsuleDateService {
    /**
     * 설명: 날짜 캡슐 조회
     * @param teamId
     * @return List<CapsuleListDto>
     */
    List<CapsuleListDto> getCapsuleList(Integer teamId);

    /**
     * 설명: 날짜 캡슐 생성
     * @param dto
     */
    void createCapsuleDate(CapsuleDateDto dto);

    /**
     * 설명: 캡슐 삭제
     * @param capId
     */
    void deleteCapsuleDate(Integer capId);
}
