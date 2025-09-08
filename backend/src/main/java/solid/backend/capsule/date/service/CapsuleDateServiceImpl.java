package solid.backend.capsule.date.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import solid.backend.capsule.date.dto.CapsuleDateDto;
import solid.backend.capsule.date.dto.CapsuleListDto;
import solid.backend.common.FileManager;
import solid.backend.entity.Capsule;
import solid.backend.entity.TeamMember;
import solid.backend.entity.TeamMemberId;
import solid.backend.jpaRepository.CapsuleRepository;
import solid.backend.jpaRepository.TeamMemberRepository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CapsuleDateServiceImpl implements CapsuleDateService {
    private final CapsuleRepository capsuleRepository;
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

        return capsules.stream()
                .filter(capsule -> capsule.getCapsuleCondition() == null)
                .filter(capsule -> capsule.getCapsuleLocation() == null)
                .map(capsule -> new CapsuleListDto(
                        capsule.getCapId(),
                        capsule.getTeam().getTeamId(),
                        capsule.getMember().getMemberId(),
                        capsule.getMember().getMemberNickname(),
                        capsule.getCapText(),
                        capsule.getCapUt(),
                        capsule.getCapEt(),
                        capsule.getCapImg() != null ? fileManager.getFileUrl(capsule.getCapImg()) : null,
                        capsule.getCapTag(),
                        capsule.getCapOpen()
                ))
                .collect(Collectors.toList());
    }

    /**
     * 설명: 날짜 캡슐 생성
     * @param capsuleDateDto
     */
    @Override
    @Transactional
    public void createCapsuleDate(CapsuleDateDto capsuleDateDto) {
        TeamMemberId teamMemberId = new TeamMemberId(capsuleDateDto.getTeamId(), capsuleDateDto.getMemberId());

        TeamMember teamMember = teamMemberRepository.findById(teamMemberId)
                .orElseThrow(() -> new IllegalArgumentException("해당 멤버는 팀 소속이 아니거나, 존재하지 않는 멤버 또는 팀입니다."));

        Capsule capsule = new Capsule();

        capsule.setTeam(teamMember.getTeam());
        capsule.setMember(teamMember.getMember());
        capsule.setCapText(capsuleDateDto.getCapText());
        capsule.setCapUt(LocalDateTime.now());
        capsule.setCapEt(capsuleDateDto.getCapEt());

        String capImg = fileManager.addFile(capsuleDateDto.getCapImg(), "capsule");
        if (capImg != null) capsule.setCapImg(capImg);

        capsule.setCapTag(capsuleDateDto.getCapTag());
        capsule.setCapOpen(false);

        capsuleRepository.save(capsule);
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
