package solid.backend.capsule.lt;

import jakarta.transaction.Transactional;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import solid.backend.capsule.lt.dto.LtAddDto;
import solid.backend.capsule.lt.dto.LtListDto;
import solid.backend.capsule.lt.service.LtService;
import solid.backend.entity.Capsule;
import solid.backend.entity.CapsuleLT;
import solid.backend.jpaRepository.CapsuleLtRepository;
import solid.backend.jpaRepository.CapsuleRepository;

import java.time.LocalDateTime;
import java.util.List;

import static org.assertj.core.api.AssertionsForInterfaceTypes.assertThat;

@SpringBootTest
@Transactional
public class LtServiceTest {

    @Autowired
    private LtService ltService;
    @Autowired
    private CapsuleRepository capsuleRepository;
    @Autowired
    private CapsuleLtRepository capsuleLtRepository;

    @Test
    @DisplayName("캡슐 위치 리스트")
    void getLtList_suc() {
        //given
        Integer teamId = 21;

        //when
        List<LtListDto> ltList = ltService.getLtList(teamId);

        //then
        assertThat(ltList).isNotNull();
        assertThat(ltList).isNotEmpty();
    }


    @Test
    @DisplayName("캡슐 위치 추가")
    void addLtDto_suc() {
        //given
        LtAddDto ltAddDto = new LtAddDto();
        ltAddDto.setTeamId(21);
        ltAddDto.setMemberId("test_1755765537675");
        ltAddDto.setCapText("testCodeText");
        ltAddDto.setCapUt(LocalDateTime.now());
        ltAddDto.setCapImg(null);
        ltAddDto.setCapTag("testCodeTag");
        ltAddDto.setCapLtAddr("testCodeAddr");
        ltAddDto.setCapLtDetail("testCodeDetail");

        //when
        ltService.addLtDto(ltAddDto);

        //then
        List<Capsule> capsules = capsuleRepository.findAll();
        Capsule savedCapsule = capsules.get(capsules.size() - 1);
        assertThat(savedCapsule.getCapText()).isEqualTo("testCodeText");
        assertThat(savedCapsule.getCapTag()).isEqualTo("testCodeTag");
        assertThat(savedCapsule.getCapOpen()).isFalse();

        List<CapsuleLT> capsuleLT = capsuleLtRepository.findAll();
        CapsuleLT savedCapsuleLT = capsuleLT.get(capsuleLT.size() - 1);
        assertThat(savedCapsuleLT.getCapLtAddr()).isEqualTo("testCodeAddr");
        assertThat(savedCapsuleLT.getCapLtDetail()).isEqualTo("testCodeDetail");
    }
}
