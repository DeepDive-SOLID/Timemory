package solid.backend.capsule.date.service;

import solid.backend.capsule.date.dto.CapsuleDateDto;
import solid.backend.capsule.date.dto.CapsuleListDto;

import java.util.List;

public interface CapsuleDateService {
    List<CapsuleListDto> getCapsuleList(Integer teamId);
    void createCapsuleDate(CapsuleDateDto dto);
    void deleteCapsuleDate(Integer capId);
}
