package solid.backend.capsule.open.service;

import solid.backend.capsule.open.dto.CapsuleCndtOpenDto;
import solid.backend.capsule.open.dto.CapsuleDateOpenDto;
import solid.backend.capsule.open.dto.CapsuleLtOpenDto;

import java.util.List;

public interface CapsuleOpenService {
    /**
     * 설명: 날짜 캡슐 오픈 처리 후 캡슐 데이터 반환
     * @param capId
     * @return List<CapsuleDateOpenDto>
     */
    List<CapsuleDateOpenDto> getCapsuleDateList(Integer capId);

    /**
     * 설명: 조건 캡슐 오픈 후 캡슐 데이터 반환
     * @param capId
     * @return List<CapsuleCndtOpenDto>
     */
    List<CapsuleCndtOpenDto> getCapsuleCndtList(Integer capId);

    /**
     * 설명: 위치 캡슐 오픈 후 캡슐 데이터 반환
     * @param capId
     * @return List<CapsuleLtOpenDto>
     */
    List<CapsuleLtOpenDto> getCapsuleLtList(Integer capId);
}
