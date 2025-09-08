package solid.backend.capsule.detail.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import solid.backend.capsule.detail.dto.CapsuleDetailDto;
import solid.backend.common.FileManager;
import solid.backend.jpaRepository.CapsuleRepository;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CapsuleDetailServiceImpl implements CapsuleDetailService{

    private final CapsuleRepository capsuleRepository;
    private final FileManager fileManager;

    /**
     * 설명 : 캡슐 상세 조회
     * @param capsuleId
     * @return CapsuleDetailDto
     */
    @Override
    public CapsuleDetailDto getCapsuleDetail(Integer capsuleId) {
        return capsuleRepository.findById(capsuleId)
                .map(capsule -> new CapsuleDetailDto(
                        capsule.getCapText(),
                        capsule.getCapUt(),
                        capsule.getCapTag(),
                        capsule.getCapImg() != null ? fileManager.getFileUrl(capsule.getCapImg()) : null,
                        Optional.ofNullable(capsule.getTeam().getTeamName())
                                .map(name -> name.startsWith("TIME_CAPSULE_")
                                        ? name.replaceFirst("^TIME_CAPSULE_", "")
                                        : name
                                )
                                .orElse(null),
                        capsule.getTeam().getTeamMembers().stream()
                                .map(teamMember -> {
                                    String profile = teamMember.getMember().getMemberProfile();
                                    return profile != null ? fileManager.getFileUrl(profile) : null;
                                })
                                .toList()
                ))
                .orElseThrow(() -> new RuntimeException("해당 캡슐을 찾을 수 없습니다."));
    }
}
