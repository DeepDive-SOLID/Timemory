package solid.backend.open.service;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import solid.backend.common.FileManager;
import solid.backend.entity.*;
import solid.backend.jpaRepository.CapsuleRepository;
import solid.backend.jpaRepository.MemberRepository;
import solid.backend.jpaRepository.TeamMemberRepository;
import solid.backend.jpaRepository.TeamRepository;
import solid.backend.open.dto.OpenCapsuleAddDto;
import solid.backend.open.dto.OpenCapsuleListDto;
import solid.backend.open.dto.OpenListDto;
import solid.backend.open.repository.OpenQueryRepository;

import java.util.List;

@Service
@RequiredArgsConstructor
public class OpenServiceImpl implements OpenService {

    private final OpenQueryRepository openQueryRepository;
    private final TeamRepository teamRepository;
    private final MemberRepository memberRepository;
    private final FileManager fileManager;
    private final TeamMemberRepository teamMemberRepository;
    private final CapsuleRepository capsuleRepository;

    /**
     * 설명 : 오픈 그룹 리스트 정보
     * @return List<OpenDto>
     */
    @Override
    public List<OpenListDto> getOpenList() {
        List<OpenListDto> list = openQueryRepository.getOpenList();
        list.forEach(dto -> {
            List<String> processedProfiles = dto.getMemberProfiles().stream()
                    .map(fileManager::getFileUrl)
                    .toList();
            dto.setMemberProfiles(processedProfiles);
        });
        return list;
    }

    /**
     * 설명 : 오픈 그룹 캡슐 리스트 정보
     * @param teamId
     * @return List<OpenCapsuleListDto>
     */
    @Override
    public List<OpenCapsuleListDto> getOpenCapsuleList(Integer teamId) {
        return openQueryRepository.getOpenCapsuleList(teamId);
    }

    /**
     * 설명 : 오픈 그룹 캡슐 추가
     * @param capsuleDto
     */
    @Override
    @Transactional
    public void addOpenCapsuleDto(OpenCapsuleAddDto capsuleDto) {

        Team team = teamRepository.findById(capsuleDto.getTeamId())
                .orElseThrow(() -> new RuntimeException("해당 팀이 없습니다: id = " + capsuleDto.getTeamId()));

        Member member = memberRepository.findById(capsuleDto.getMemberId())
                .orElseThrow(() -> new RuntimeException("해당 회원이 없습니다: id = " + capsuleDto.getMemberId()));

        // team_member 데이터 추가
        TeamMember teamMember = new TeamMember();
        TeamMemberId teamMemberId = new TeamMemberId(team.getTeamId(), member.getMemberId());
        teamMember.setId(teamMemberId);
        teamMember.setTeam(team);
        teamMember.setMember(member);

        // capsule 테이블 데이터 추가
        Capsule capsule = new Capsule();
        capsule.setTeam(team);
        capsule.setMember(member);
        capsule.setCapText(capsuleDto.getCapText());
        capsule.setCapUt(capsuleDto.getCapUt());
        capsule.setCapEt(capsuleDto.getCapUt().plusYears(1));
        capsule.setCapTag(capsuleDto.getCapTag());
        capsule.setCapOpen(false);
        capsule.setCapSent(false);

        // 파일을 로컬 디렉토리에 저장
        String capImg = fileManager.addFile(capsuleDto.getCapImg(), "capsule");
        if (capImg != null) capsule.setCapImg(capImg);

        teamMemberRepository.save(teamMember);
        capsuleRepository.save(capsule);
    }
}
