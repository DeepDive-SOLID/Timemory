package solid.backend.capsule.lt.service;

import solid.backend.capsule.lt.dto.LtAddDto;
import solid.backend.capsule.lt.dto.LtListDto;

import java.util.List;

public interface LtService {

    /**
     * 설명 : 캡슐 위치 리스트 정보
     * @param teamId
     * @return List<LtListDto>
     */
    List<LtListDto> getLtList(Integer teamId);

    /**
     * 설명 : 캡슐 위치 정보 추가
     * @param ltDto
     */
    void addLtDto(LtAddDto ltDto);
}
