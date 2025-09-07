package solid.backend.capsule.date;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.transaction.annotation.Transactional;
import solid.backend.capsule.date.dto.CapsuleDateDto;
import solid.backend.capsule.date.dto.CapsuleListDto;
import solid.backend.capsule.date.service.CapsuleDateService;
import solid.backend.common.FileManager;
import solid.backend.entity.Capsule;
import solid.backend.jpaRepository.CapsuleRepository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;
import static org.mockito.Mockito.verify;

import static org.assertj.core.api.AssertionsForInterfaceTypes.assertThat;

@SpringBootTest
@Transactional
public class CapsuleDateServiceTest {
    @Autowired
    private CapsuleDateService capsuleDateService;
    @Autowired
    private CapsuleRepository capsuleRepository;
    @MockitoBean
    FileManager fileManager;


    @Test
    @DisplayName("날짜 캡슐 리스트")
    void capsuleDateListTest() {
        //given
        Integer teamId = 11;

        //when
        List<CapsuleListDto> capDateList = capsuleDateService.getCapsuleList(teamId);

        //than
        int expected = (int) capsuleRepository.findByTeamTeamId(teamId).stream()
                .filter(c -> c.getCapsuleCondition() == null)
                .filter(c -> c.getCapsuleLocation() == null)
                .count();

        assertThat(capDateList).hasSize(expected);
        assertThat(capDateList).isNotNull();
        assertThat(capDateList).isNotEmpty();
    }

    @Test
    @DisplayName("날짜 캡슐 생성")
    void createCapsuleDateTest() {
        //given
        CapsuleDateDto capsuleDateDto = new CapsuleDateDto();

        capsuleDateDto.setTeamId(11);
        capsuleDateDto.setMemberId("4411536944");
        capsuleDateDto.setCapText("test");
        capsuleDateDto.setCapEt(LocalDateTime.now().plusYears(1));
        capsuleDateDto.setCapImg(null);
        capsuleDateDto.setCapTag("tag");

        // 기존 목록(ID)
        List<Capsule> before = capsuleRepository.findByTeamTeamId(11);
        Set<Integer> beforeIds = before.stream().map(Capsule::getCapId).collect(Collectors.toSet());


        //when
        capsuleDateService.createCapsuleDate(capsuleDateDto);

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
    }

    @Test
    @DisplayName("날짜 캡슐 삭제")
    void deleteCapsuleDateTest() {
        // given
        Integer capId = 40;

        String expectedImg = capsuleRepository.findById(capId)
                .map(Capsule::getCapImg)
                .orElse(null);

        // when
        capsuleDateService.deleteCapsuleDate(capId);

        // than
        verify(fileManager).deleteFile(expectedImg);
        assertThat(capsuleRepository.findById(capId)).isEmpty();
    }
}
