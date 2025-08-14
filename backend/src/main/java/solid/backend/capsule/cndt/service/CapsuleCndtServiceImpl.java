package solid.backend.capsule.cndt.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import solid.backend.capsule.cndt.dto.CapsuleCndtDto;
import solid.backend.capsule.cndt.dto.CapsuleListDto;
import solid.backend.common.FileManager;
import solid.backend.entity.Capsule;
import solid.backend.entity.CapsuleCNDT;
import solid.backend.entity.TeamMember;
import solid.backend.entity.TeamMemberId;
import solid.backend.jpaRepository.CapsuleCndtRepository;
import solid.backend.jpaRepository.CapsuleRepository;
import solid.backend.jpaRepository.TeamMemberRepository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CapsuleCndtServiceImpl implements CapsuleCndtService {
    private final CapsuleRepository capsuleRepository;
    private final CapsuleCndtRepository capsuleCndtRepository;
    private final TeamMemberRepository teamMemberRepository;
    private final FileManager fileManager;


    /**
     * 설명: 캡슐 조회
     * @param teamId
     * @return List<CapsuleListDto>
     */
    @Override
    @Transactional
    public List<CapsuleListDto> getCapsuleList(Integer teamId) {
        List<Capsule> capsules = capsuleRepository.findByTeamTeamId(teamId);

        // 캡슐 cndt가 없으면 null로 반환
        return capsules.stream()
                .filter(capsule -> capsule.getCapsuleCondition() != null)
                .map(capsule -> {
                    return new CapsuleListDto(
                            capsule.getCapId(),
                            capsule.getTeam().getTeamId(),
                            capsule.getMember().getMemberId(),
                            capsule.getCapText(),
                            capsule.getCapUt(),
                            capsule.getCapEt(),
                            capsule.getCapImg(),
                            capsule.getCapTag(),
                            capsule.getCapOpen(),
                            capsule.getCapsuleCondition().getCapCndtCase()
                    );
                })
                .collect(Collectors.toList());
    }

    /**
     * 설명: 조건 캡슐 생성
     * @param capsuleCndtDto
     */
    @Override
    @Transactional
    public void createCapsuleDate(CapsuleCndtDto capsuleCndtDto) {
        TeamMemberId teamMemberId = new TeamMemberId(capsuleCndtDto.getTeamId(), capsuleCndtDto.getMemberId());

        TeamMember teamMember = teamMemberRepository.findById(teamMemberId)
                .orElseThrow(() -> new IllegalArgumentException("해당 멤버는 팀 소속이 아니거나, 존재하지 않는 멤버 또는 팀입니다."));

        Capsule capsule = new Capsule();

        capsule.setTeam(teamMember.getTeam());
        capsule.setMember(teamMember.getMember());
        capsule.setCapText(capsuleCndtDto.getCapText());
        capsule.setCapUt(LocalDateTime.now());
        capsule.setCapEt(capsuleCndtDto.getCapEt());

        String capImg = fileManager.addFile(capsuleCndtDto.getCapImg(), "capsule");
        if (capImg != null) capsule.setCapImg(capImg);

        capsule.setCapTag(capsuleCndtDto.getCapTag());
        capsule.setCapOpen(false);

        CapsuleCNDT capsuleCNDT = new CapsuleCNDT();
        capsuleCNDT.setCapsule(capsule);
        capsuleCNDT.setCapCndtCase(capsuleCndtDto.getCapCndtCase());

        capsuleRepository.save(capsule);
        capsuleCndtRepository.save(capsuleCNDT);
    }

    /**
     * 설명: 캡슐 삭제
     * @param capId
     */
    @Override
    @Transactional
    public void deleteCapsuleDate(Integer capId) {
        if(capId == null)throw new IllegalArgumentException("삭제할 캡슐이 없습니다.");
        Capsule capsule = capsuleRepository.findById(capId)
                .orElseThrow(() -> new IllegalArgumentException("해당 캡슐이 없습니다."));

        fileManager.deleteFile(capsule.getCapImg());
        capsuleRepository.deleteById(capId);
    }
}
