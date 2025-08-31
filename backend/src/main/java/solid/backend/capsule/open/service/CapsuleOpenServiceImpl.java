package solid.backend.capsule.open.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import solid.backend.capsule.open.dto.CapsuleCndtOpenDto;
import solid.backend.capsule.open.dto.CapsuleDateOpenDto;
import solid.backend.capsule.open.dto.CapsuleLtOpenDto;
import solid.backend.common.CapsuleScheduler;
import solid.backend.entity.Capsule;
import solid.backend.jpaRepository.CapsuleRepository;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CapsuleOpenServiceImpl implements CapsuleOpenService{
    private final CapsuleRepository capsuleRepository;
    private final CapsuleScheduler capsuleScheduler;

    /**
     * 설명: 날짜 캡슐 오픈 처리 후 캡슐 데이터 반환
     * @param capId
     * @return List<CapsuleDateOpenDto>
     */
    @Override
    @Transactional
    public List<CapsuleDateOpenDto> getCapsuleDateList(Integer capId) {
        Capsule cap = capsuleRepository.findById(capId)
                .orElseThrow(() -> new IllegalArgumentException("해당 캡슐이 존재하지 않습니다: " + capId));

        cap.setCapOpen(true);
        capsuleRepository.save(cap);

        CapsuleDateOpenDto dto = new CapsuleDateOpenDto(
                cap.getCapId(),
                cap.getTeam().getTeamId(),
                cap.getMember().getMemberId(),
                cap.getCapText(),
                cap.getCapUt(),
                cap.getCapEt(),
                cap.getCapImg(),
                cap.getCapTag(),
                cap.getCapOpen()
        );
        return List.of(dto);
    }

    /**
     * 설명: 조건 캡슐 오픈 후 캡슐 데이터 반환
     * @param capId
     * @return List<CapsuleCndtOpenDto>
     */
    @Override
    @Transactional
    public List<CapsuleCndtOpenDto> getCapsuleCndtList(Integer capId) {
        Capsule cap = capsuleRepository.findById(capId)
                .orElseThrow(() -> new IllegalArgumentException("해당 캡슐이 존재하지 않습니다: " + capId));

        cap.setCapOpen(true);
        capsuleRepository.save(cap);

        CapsuleCndtOpenDto dto = new CapsuleCndtOpenDto(
                cap.getCapId(),
                cap.getTeam().getTeamId(),
                cap.getMember().getMemberId(),
                cap.getCapText(),
                cap.getCapUt(),
                cap.getCapEt(),
                cap.getCapImg(),
                cap.getCapTag(),
                cap.getCapOpen(),
                cap.getCapsuleCondition().getCapCndtCase()
        );
        return List.of(dto);
    }

    /**
     * 설명: 위치 캡슐 오픈 후 캡슐 데이터 반환
     * @param capId
     * @return List<CapsuleLtOpenDto>
     */
    @Override
    @Transactional
    public List<CapsuleLtOpenDto> getCapsuleLtList(Integer capId) {
        Capsule cap = capsuleRepository.findById(capId)
                .orElseThrow(() -> new IllegalArgumentException("해당 캡슐이 존재하지 않습니다: " + capId));

        cap.setCapOpen(true);
        capsuleRepository.save(cap);


        CapsuleLtOpenDto dto = new CapsuleLtOpenDto(
                cap.getCapId(),
                cap.getTeam().getTeamId(),
                cap.getMember().getMemberId(),
                cap.getCapText(),
                cap.getCapUt(),
                cap.getCapEt(),
                cap.getCapImg(),
                cap.getCapTag(),
                cap.getCapOpen(),
                cap.getCapsuleLocation().getCapLtAddr(),
                cap.getCapsuleLocation().getCapLtDetail()
        );
        return List.of(dto);
    }
}
