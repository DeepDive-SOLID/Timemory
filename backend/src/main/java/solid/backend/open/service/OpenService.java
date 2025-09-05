package solid.backend.open.service;

import solid.backend.open.dto.OpenCapsuleAddDto;
import solid.backend.open.dto.OpenCapsuleListDto;
import solid.backend.open.dto.OpenListDto;

import java.util.List;

public interface OpenService {

    /**
     * 설명 : 오픈 그룹 리스트 정보
     * @return List<OpenDto>
     */
    List<OpenListDto> getOpenList();

    /**
     * 설명 : 오픈 그룹 캡슐 리스트 정보
     * @param teamId
     * @return List<OpenCapsuleListDto>
     */
    List<OpenCapsuleListDto> getOpenCapsuleList(Integer teamId);

    /**
     * 설명 : 오픈 그룹 캡슐 추가
     * @param capsuleDto
     */
    void addOpenCapsuleDto(OpenCapsuleAddDto capsuleDto);

}
