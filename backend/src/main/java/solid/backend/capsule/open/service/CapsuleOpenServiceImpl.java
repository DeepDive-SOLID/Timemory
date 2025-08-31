package solid.backend.capsule.open.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import solid.backend.capsule.open.dto.CapsuleCndtOpenDto;
import solid.backend.capsule.open.dto.CapsuleDateOpenDto;
import solid.backend.capsule.open.dto.CapsuleLtOpenDto;
import solid.backend.common.FileManager;
import solid.backend.common.SentManager;
import solid.backend.entity.Capsule;
import solid.backend.jpaRepository.CapsuleRepository;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CapsuleOpenServiceImpl implements CapsuleOpenService{
    private final CapsuleRepository capsuleRepository;
    private final SentManager sentManager;
    private final FileManager fileManager;

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
                cap.getMember().getMemberNickname(),
                cap.getCapText(),
                cap.getCapUt(),
                cap.getCapEt(),
                cap.getCapImg() != null ? fileManager.getFileUrl(cap.getCapImg()) : null,
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

        if(!cap.getCapOpen()) {
            cap.setCapOpen(true);
            capsuleRepository.save(cap);
        }

        // 메시지 전송
        sentManager.sentMessage(capId);

        CapsuleCndtOpenDto dto = new CapsuleCndtOpenDto(
                cap.getCapId(),
                cap.getTeam().getTeamId(),
                cap.getMember().getMemberId(),
                cap.getMember().getMemberNickname(),
                cap.getCapText(),
                cap.getCapUt(),
                cap.getCapEt(),
                cap.getCapImg() != null ? fileManager.getFileUrl(cap.getCapImg()) : null,
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

        if(!cap.getCapOpen()) {
            cap.setCapOpen(true);
            capsuleRepository.save(cap);
        }

        // 메시지 전송
        sentManager.sentMessage(capId);

        CapsuleLtOpenDto dto = new CapsuleLtOpenDto(
                cap.getCapId(),
                cap.getTeam().getTeamId(),
                cap.getMember().getMemberId(),
                cap.getMember().getMemberNickname(),
                cap.getCapText(),
                cap.getCapUt(),
                cap.getCapEt(),
                cap.getCapImg() != null ? fileManager.getFileUrl(cap.getCapImg()) : null,
                cap.getCapTag(),
                cap.getCapOpen(),
                cap.getCapsuleLocation().getCapLtAddr(),
                cap.getCapsuleLocation().getCapLtDetail()
        );
        return List.of(dto);
    }
}
