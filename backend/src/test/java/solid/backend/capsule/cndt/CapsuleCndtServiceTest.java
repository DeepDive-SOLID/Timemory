package solid.backend.capsule.cndt;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.transaction.annotation.Transactional;
import solid.backend.capsule.cndt.dto.CapsuleCndtDto;
import solid.backend.capsule.cndt.dto.CapsuleListDto;
import solid.backend.capsule.cndt.service.CapsuleCndtService;
import solid.backend.common.FileManager;
import solid.backend.entity.Capsule;
import solid.backend.entity.CapsuleCNDT;
import solid.backend.jpaRepository.CapsuleCndtRepository;
import solid.backend.jpaRepository.CapsuleRepository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import static org.assertj.core.api.AssertionsForInterfaceTypes.assertThat;
import static org.mockito.Mockito.verify;

@SpringBootTest
@Transactional
public class CapsuleCndtServiceTest {
    @Autowired
    private CapsuleCndtService capsuleCndtService;
    @Autowired
    private CapsuleRepository capsuleRepository;
    @Autowired
    private CapsuleCndtRepository capsuleCndtRepository;
    @MockitoBean
    FileManager fileManager;

    @Test
    @DisplayName("조건 캡슐 리스트")
    void capsuleCndtListTest() {
        //given
        Integer teamId = 21;

        //when
        List<CapsuleListDto> capCndtList = capsuleCndtService.getCapsuleList(teamId);

        //than
        int expected = (int) capsuleRepository.findByTeamTeamId(teamId).stream()
                .filter(capsule -> capsule.getCapsuleCondition() != null)
                .count();

        assertThat(capCndtList).hasSize(expected);
        assertThat(capCndtList).isNotNull();
        assertThat(capCndtList).isNotEmpty();
    }

    @Test
    @DisplayName("조건 캡슐 생성")
    void createCapsuleCndtTest() {
        //given
        CapsuleCndtDto capsuleCndtDto = new CapsuleCndtDto();

        capsuleCndtDto.setTeamId(11);
        capsuleCndtDto.setMemberId("4411536944");
        capsuleCndtDto.setCapText("test");
        capsuleCndtDto.setCapEt(LocalDateTime.now().plusYears(1));
        capsuleCndtDto.setCapImg(null);
        capsuleCndtDto.setCapTag("tag");
        capsuleCndtDto.setCapCndtCase("첫눈 오는 날");

        // 기존 목록(ID)
        List<Capsule> before = capsuleRepository.findByTeamTeamId(11);
        Set<Integer> beforeIds = before.stream().map(Capsule::getCapId).collect(Collectors.toSet());

        //when
        capsuleCndtService.createCapsuleDate(capsuleCndtDto);

        //than
        // 새롭게 추가
        List<Capsule> after = capsuleRepository.findByTeamTeamId(11);
        assertThat(after.size()).isEqualTo(before.size() + 1);

        // 새로 추가된 캡슐만 식별
        Capsule created = after.stream()
                .filter(c -> !beforeIds.contains(c.getCapId()))
                .findFirst()
                .orElseThrow(() -> new AssertionError("신규 캡슐을 찾지 못했습니다."));

        // 필드 검증
        assertThat(created.getMember().getMemberId()).isEqualTo("4411536944");
        assertThat(created.getCapText()).isEqualTo("test");
        assertThat(created.getCapTag()).isEqualTo("tag");
        assertThat(created.getCapOpen()).isFalse();
        assertThat(created.getCapEt()).isNotNull();
        assertThat(created.getCapUt()).isNotNull();

        CapsuleCNDT cond = capsuleCndtRepository.findAll().stream()
                .filter(c -> c.getCapsule().getCapId().equals(created.getCapId()))
                .findFirst()
                .orElseThrow(() -> new AssertionError("조건 캡슐이 생성되지 않았습니다."));

        assertThat(cond.getCapCndtCase()).isEqualTo("첫눈 오는 날");
    }

    @Test
    @DisplayName("조건 캡슐 삭제")
    void deleteCapsuleCndt() {
        // given
        Integer capId = 40;

        String expectedImg = capsuleRepository.findById(capId)
                .map(Capsule::getCapImg)
                .orElse(null);

        // when
        capsuleCndtService.deleteCapsuleDate(capId);

        // than
        verify(fileManager).deleteFile(expectedImg);
        assertThat(capsuleRepository.findById(capId)).isEmpty();
    }
}
