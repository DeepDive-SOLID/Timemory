package solid.backend.mypage;

import jakarta.transaction.Transactional;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import solid.backend.entity.Member;
import solid.backend.jpaRepository.MemberRepository;
import solid.backend.mypage.dto.MypageDto;
import solid.backend.mypage.dto.MypageUpdDto;
import solid.backend.mypage.service.MypageService;

import java.time.LocalDate;

import static org.assertj.core.api.AssertionsForInterfaceTypes.assertThat;

@SpringBootTest
@Transactional
public class MypageServiceTest {

    @Autowired
    private MypageService mypageService;

    @Autowired
    private MemberRepository memberRepository;

    @Test
    @DisplayName("회원 정보 조회")
    void getMemberDto_suc() {
        //given
        String memberId = "test_1755765537675";

        //when
        MypageDto mypageDto = mypageService.getMemberDto(memberId);

        //then
        assertThat(mypageDto.getMemberName()).isEqualTo("testuser_1755765537");
        assertThat(mypageDto.getMemberNickname()).isEqualTo("testuser_1755765537");
        assertThat(mypageDto.getMemberEmail()).isEqualTo("test@naver.com");
        assertThat(mypageDto.getMemberPhone()).isEqualTo("010-1234-5678");
        assertThat(mypageDto.getMemberBirth()).isEqualTo("2000-01-01");
    }

    @Test
    @DisplayName("회원 정보 수정")
    void updateMemberDto_suc() {
        //given
        MypageUpdDto mypageUpdDto = new MypageUpdDto();
        mypageUpdDto.setMemberId("test_1755765537675");
        mypageUpdDto.setMemberName("testuser_1755765537");
        mypageUpdDto.setMemberEmail("test@naver.com");
        mypageUpdDto.setMemberPhone("010-1234-1234");
        mypageUpdDto.setMemberBirth(LocalDate.parse("2000-01-01"));

        //when
        mypageService.updateMemberDto(mypageUpdDto);

        //then
        Member member = memberRepository.findById(mypageUpdDto.getMemberId()).orElseThrow();
        assertThat(member.getMemberName()).isEqualTo("testuser_1755765537");
        assertThat(member.getMemberEmail()).isEqualTo("test@naver.com");
        assertThat(member.getMemberPhone()).isEqualTo("010-1234-1234");
        assertThat(member.getMemberBirth()).isEqualTo("2000-01-01");
    }

    @Test
    @DisplayName("회원 정보 삭제")
    void deleteMember_suc() {
        //given
        String memberId = "test_1755765537675";

        //when
        mypageService.deleteMemberDto(memberId);

        //then
        assertThat(memberRepository.existsById(memberId)).isFalse();
    }
}
