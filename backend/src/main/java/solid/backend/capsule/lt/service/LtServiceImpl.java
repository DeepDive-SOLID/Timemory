package solid.backend.capsule.lt.service;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import solid.backend.capsule.lt.dto.LtAddDto;
import solid.backend.capsule.lt.dto.LtListDto;
import solid.backend.capsule.lt.repository.LtQueryRepository;
import solid.backend.common.FileManager;
import solid.backend.entity.Capsule;
import solid.backend.entity.CapsuleLT;
import solid.backend.entity.Member;
import solid.backend.entity.Team;
import solid.backend.jpaRepository.CapsuleLtRepository;
import solid.backend.jpaRepository.CapsuleRepository;
import solid.backend.jpaRepository.MemberRepository;
import solid.backend.jpaRepository.TeamRepository;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class LtServiceImpl implements LtService {

    private final FileManager fileManager;
    private final CapsuleRepository capsuleRepository;
    private final TeamRepository teamRepository;
    private final MemberRepository memberRepository;
    private final CapsuleLtRepository capsuleLtRepository;
    private final LtQueryRepository ltQueryRepository;

    /**
     * 설명 : 캡슐 위치 리스트 정보
     * @param teamId
     * @return List<LtListDto>
     */
    @Override
    public List<LtListDto> getLtList(Integer teamId) {
        return ltQueryRepository.getLtList(teamId).stream()
                .peek(dto -> {
                    if (dto.getCapImg() != null) {
                        dto.setCapImg(fileManager.getFileUrl(dto.getCapImg()));
                    }
                })
                .collect(Collectors.toList());
    }

    /**
     * 설명 : 캡슐 위치 정보 추가
     * @param ltDto
     */
    @Override
    @Transactional
    public void addLtDto(LtAddDto ltDto) {

        Team team = teamRepository.findById(ltDto.getTeamId())
                .orElseThrow(() -> new RuntimeException("해당 팀이 없습니다: id = " + ltDto.getTeamId()));

        Member member = memberRepository.findById(ltDto.getMemberId())
                .orElseThrow(() -> new RuntimeException("해당 회원이 없습니다: id = " + ltDto.getMemberId()));

        // 캡슐 테이블 데이터 추가
        Capsule capsule = new Capsule();
        capsule.setTeam(team);
        capsule.setMember(member);
        capsule.setCapText(ltDto.getCapText());
        capsule.setCapUt(ltDto.getCapUt());
        capsule.setCapEt(ltDto.getCapUt().plusYears(1));
        capsule.setCapTag(ltDto.getCapTag());
        capsule.setCapOpen(false);

        // 파일을 로컬 디렉토리에 저장
        String capImg = fileManager.addFile(ltDto.getCapImg(), "capsule");
        if (capImg != null) capsule.setCapImg(capImg);

        // 캡슐 위치 테이블 데이터 추가
        CapsuleLT capsuleLT = new CapsuleLT();
        capsuleLT.setCapsule(capsule);
        capsuleLT.setCapLtAddr(ltDto.getCapLtAddr());
        capsuleLT.setCapLtDetail(ltDto.getCapLtDetail());

        capsuleRepository.save(capsule);
        capsuleLtRepository.save(capsuleLT);
    }

}
