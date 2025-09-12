package solid.backend.team.service;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import solid.backend.common.FileManager;
import solid.backend.entity.Member;
import solid.backend.entity.Team;
import solid.backend.entity.TeamMember;
import solid.backend.entity.TeamMemberId;
import solid.backend.exception.CustomException;
import solid.backend.exception.ErrorCode;
import solid.backend.jpaRepository.MemberRepository;
import solid.backend.jpaRepository.TeamMemberRepository;
import solid.backend.jpaRepository.TeamRepository;
import solid.backend.member.repository.MemberQueryRepository;
import solid.backend.team.dto.TeamCreateRequestDto;
import solid.backend.team.dto.TeamResponseDto;
import solid.backend.team.repository.TeamQueryRepository;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.*;

/**
 * TeamService 단위 테스트
 * 비즈니스 핵심 로직을 중심으로 테스트
 */
@ExtendWith(MockitoExtension.class)
class TeamServiceTest {

    @InjectMocks
    private TeamServiceImpl teamService;

    @Mock
    private TeamRepository teamRepository;
    
    @Mock
    private TeamMemberRepository teamMemberRepository;
    
    @Mock
    private MemberRepository memberRepository;
    
    @Mock
    private TeamQueryRepository teamQueryRepository;
    
    @Mock
    private MemberQueryRepository memberQueryRepository;
    
    @Mock
    private FileManager fileManager;

    private Member testMember;
    private Team testTeam;

    @BeforeEach
    void setUp() {
        testMember = Member.builder()
                .memberId("kakao_123456")
                .memberNickname("테스트유저")
                .memberProfile("profile.jpg")
                .build();
        
        testTeam = Team.builder()
                .teamId(1)
                .teamName("테스트팀")
                .build();
    }

    @Nested
    @DisplayName("팀 생성 테스트")
    class CreateTeamTest {
        
        @Test
        @DisplayName("정상적인 팀 생성 - 생성자가 첫 멤버가 됨")
        void createTeam_Success() {
            // Given
            String creatorId = "kakao_123456";
            TeamCreateRequestDto request = TeamCreateRequestDto.builder()
                    .teamName("개발팀")
                    .build();
            
            Team savedTeam = Team.builder()
                    .teamId(1)
                    .teamName("개발팀")
                    .build();
            
            when(memberRepository.findById(creatorId))
                    .thenReturn(Optional.of(testMember));
            when(teamRepository.save(any(Team.class)))
                    .thenReturn(savedTeam);
            when(teamRepository.findById(1))
                    .thenReturn(Optional.of(savedTeam));
            when(teamQueryRepository.findMembersByTeamId(1))
                    .thenReturn(Arrays.asList(testMember));
            
            // When
            TeamResponseDto result = teamService.createTeam(request, creatorId);
            
            // Then
            assertThat(result).isNotNull();
            assertThat(result.getTeamName()).isEqualTo("개발팀");
            assertThat(result.getMemberCount()).isEqualTo(1);
            
            verify(teamRepository).save(any(Team.class));
            verify(teamMemberRepository).save(any(TeamMember.class));
        }
        
        @Test
        @DisplayName("TIME_CAPSULE로 시작하는 팀명은 생성 불가")
        void createTeam_TimeCapsuleName_ThrowException() {
            // Given
            TeamCreateRequestDto request = TeamCreateRequestDto.builder()
                    .teamName("TIME_CAPSULE_2024")
                    .build();
            
            when(memberRepository.findById("kakao_123456"))
                    .thenReturn(Optional.of(testMember));
            
            // When & Then
            assertThatThrownBy(() -> 
                teamService.createTeam(request, "kakao_123456"))
                .isInstanceOf(CustomException.class)
                .hasFieldOrPropertyWithValue("errorCode", ErrorCode.INVALID_INPUT_VALUE);
            
            verify(teamRepository, never()).save(any());
        }
        
        @Test
        @DisplayName("존재하지 않는 생성자로 팀 생성 시도")
        void createTeam_CreatorNotFound_ThrowException() {
            // Given
            TeamCreateRequestDto request = TeamCreateRequestDto.builder()
                    .teamName("팀")
                    .build();
            
            when(memberRepository.findById("unknown"))
                    .thenReturn(Optional.empty());
            
            // When & Then
            assertThatThrownBy(() -> 
                teamService.createTeam(request, "unknown"))
                .isInstanceOf(CustomException.class)
                .hasFieldOrPropertyWithValue("errorCode", ErrorCode.MEMBER_NOT_FOUND);
        }
        
        @Test
        @DisplayName("초대 실패해도 팀 생성은 성공")
        void createTeam_WithFailedInvites_StillSuccess() {
            // Given
            TeamCreateRequestDto request = TeamCreateRequestDto.builder()
                    .teamName("프로젝트팀")
                    .inviteNicknames(Arrays.asList("존재하는유저", "없는유저"))
                    .build();
            
            Member existingUser = Member.builder()
                    .memberId("exist_123")
                    .memberNickname("존재하는유저")
                    .build();
            
            Team savedTeam = Team.builder()
                    .teamId(2)
                    .teamName("프로젝트팀")
                    .build();
            
            when(memberRepository.findById("kakao_123456"))
                    .thenReturn(Optional.of(testMember));
            when(teamRepository.save(any(Team.class)))
                    .thenReturn(savedTeam);
            when(teamRepository.findById(2))
                    .thenReturn(Optional.of(savedTeam));
            when(memberRepository.findByMemberNickname("존재하는유저"))
                    .thenReturn(Optional.of(existingUser));
            when(memberRepository.findByMemberNickname("없는유저"))
                    .thenReturn(Optional.empty());
            when(teamQueryRepository.findMembersByTeamId(2))
                    .thenReturn(Arrays.asList(testMember, existingUser));
            
            // When
            TeamResponseDto result = teamService.createTeam(request, "kakao_123456");
            
            // Then
            assertThat(result).isNotNull();
            assertThat(result.getTeamName()).isEqualTo("프로젝트팀");
            verify(teamRepository).save(any(Team.class));
        }
    }

    @Nested
    @DisplayName("팀 탈퇴 테스트")
    class LeaveTeamTest {
        
        @Test
        @DisplayName("정상적인 팀 탈퇴")
        void leaveTeam_Success() {
            // Given
            Integer teamId = 1;
            String memberId = "kakao_123456";
            TeamMemberId teamMemberId = new TeamMemberId(teamId, memberId);
            TeamMember teamMember = TeamMember.builder()
                    .id(teamMemberId)
                    .team(testTeam)
                    .member(testMember)
                    .build();
            
            when(teamRepository.findById(teamId))
                    .thenReturn(Optional.of(testTeam));
            when(teamMemberRepository.findById(teamMemberId))
                    .thenReturn(Optional.of(teamMember));
            when(teamQueryRepository.countMembersByTeamId(teamId))
                    .thenReturn(5L); // 탈퇴 후에도 멤버 남음
            
            // When
            teamService.leaveTeam(teamId, memberId, memberId);
            
            // Then
            verify(teamMemberRepository).delete(teamMember);
            verify(teamRepository, never()).deleteById(anyInt());
        }
        
        @Test
        @DisplayName("마지막 멤버 탈퇴시 팀 자동 삭제")
        void leaveTeam_LastMember_DeleteTeam() {
            // Given
            Integer teamId = 1;
            String memberId = "kakao_123456";
            TeamMemberId teamMemberId = new TeamMemberId(teamId, memberId);
            TeamMember teamMember = TeamMember.builder()
                    .id(teamMemberId)
                    .team(testTeam)
                    .member(testMember)
                    .build();
            
            when(teamRepository.findById(teamId))
                    .thenReturn(Optional.of(testTeam));
            when(teamMemberRepository.findById(teamMemberId))
                    .thenReturn(Optional.of(teamMember));
            when(teamQueryRepository.countMembersByTeamId(teamId))
                    .thenReturn(0L); // 마지막 멤버
            
            // When
            teamService.leaveTeam(teamId, memberId, memberId);
            
            // Then
            verify(teamMemberRepository).delete(teamMember);
            verify(teamRepository).deleteById(teamId); // 팀 삭제 확인
        }
        
        @Test
        @DisplayName("다른 사람을 탈퇴시키려는 시도 차단")
        void leaveTeam_UnauthorizedAttempt_ThrowException() {
            // Given
            Integer teamId = 1;
            String targetMemberId = "target_123";
            String requesterId = "hacker_123";
            
            // When & Then
            assertThatThrownBy(() -> 
                teamService.leaveTeam(teamId, targetMemberId, requesterId))
                .isInstanceOf(CustomException.class)
                .hasFieldOrPropertyWithValue("errorCode", ErrorCode.UNAUTHORIZED);
            
            verify(teamMemberRepository, never()).delete(any());
        }
        
        @Test
        @DisplayName("TIME_CAPSULE 팀은 탈퇴 불가")
        void leaveTeam_TimeCapsuleTeam_ThrowException() {
            // Given
            Team timeCapsuleTeam = Team.builder()
                    .teamId(999)
                    .teamName("TIME_CAPSULE_ANNIVERSARY")
                    .build();
            
            when(teamRepository.findById(999))
                    .thenReturn(Optional.of(timeCapsuleTeam));
            
            // When & Then
            assertThatThrownBy(() -> 
                teamService.leaveTeam(999, "member", "member"))
                .isInstanceOf(CustomException.class)
                .hasFieldOrPropertyWithValue("errorCode", ErrorCode.TEAM_NOT_FOUND);
        }
    }

    @Nested
    @DisplayName("팀 멤버 추가 테스트")
    class AddTeamMemberTest {
        
        @Test
        @DisplayName("정상적인 멤버 추가")
        void addTeamMember_Success() {
            // Given
            Integer teamId = 1;
            String nickname = "새멤버";
            Member newMember = Member.builder()
                    .memberId("new_123")
                    .memberNickname(nickname)
                    .build();
            
            when(teamRepository.findById(teamId))
                    .thenReturn(Optional.of(testTeam));
            when(memberRepository.findByMemberNickname(nickname))
                    .thenReturn(Optional.of(newMember));
            when(teamMemberRepository.existsById(any(TeamMemberId.class)))
                    .thenReturn(false);
            
            // When
            var result = teamService.addTeamMemberByNickname(teamId, nickname);
            
            // Then
            assertThat(result).isNotNull();
            assertThat(result.getNickname()).isEqualTo(nickname);
            verify(teamMemberRepository).save(any(TeamMember.class));
        }
        
        @Test
        @DisplayName("이미 팀 멤버인 경우 추가 실패")
        void addTeamMember_AlreadyMember_ThrowException() {
            // Given
            Integer teamId = 1;
            String nickname = "기존멤버";
            Member existingMember = Member.builder()
                    .memberId("existing_123")
                    .memberNickname(nickname)
                    .build();
            
            when(teamRepository.findById(teamId))
                    .thenReturn(Optional.of(testTeam));
            when(memberRepository.findByMemberNickname(nickname))
                    .thenReturn(Optional.of(existingMember));
            when(teamMemberRepository.existsById(any(TeamMemberId.class)))
                    .thenReturn(true); // 이미 멤버
            
            // When & Then
            assertThatThrownBy(() -> 
                teamService.addTeamMemberByNickname(teamId, nickname))
                .isInstanceOf(CustomException.class)
                .hasFieldOrPropertyWithValue("errorCode", ErrorCode.ALREADY_TEAM_MEMBER);
            
            verify(teamMemberRepository, never()).save(any());
        }
        
        @Test
        @DisplayName("존재하지 않는 닉네임으로 추가 시도")
        void addTeamMember_MemberNotFound_ThrowException() {
            // Given
            Integer teamId = 1;
            String nickname = "없는유저";
            
            when(teamRepository.findById(teamId))
                    .thenReturn(Optional.of(testTeam));
            when(memberRepository.findByMemberNickname(nickname))
                    .thenReturn(Optional.empty());
            
            // When & Then
            assertThatThrownBy(() -> 
                teamService.addTeamMemberByNickname(teamId, nickname))
                .isInstanceOf(CustomException.class)
                .hasFieldOrPropertyWithValue("errorCode", ErrorCode.MEMBER_NOT_FOUND);
        }
    }

    @Nested
    @DisplayName("팀 조회 테스트")
    class TeamQueryTest {
        
        @Test
        @DisplayName("팀 상세 정보 조회")
        void getTeamDetail_Success() {
            // Given
            Integer teamId = 1;
            List<Member> members = Arrays.asList(testMember);
            
            when(teamRepository.findById(teamId))
                    .thenReturn(Optional.of(testTeam));
            when(teamQueryRepository.findMembersByTeamId(teamId))
                    .thenReturn(members);
            when(fileManager.getFileUrl(anyString()))
                    .thenReturn("https://s3.url/profile.jpg");
            
            // When
            TeamResponseDto result = teamService.getTeamDetail(teamId);
            
            // Then
            assertThat(result).isNotNull();
            assertThat(result.getTeamId()).isEqualTo(teamId);
            assertThat(result.getTeamName()).isEqualTo("테스트팀");
            assertThat(result.getMemberCount()).isEqualTo(1);
        }
        
        @Test
        @DisplayName("TIME_CAPSULE 팀은 조회 불가")
        void getTeamDetail_TimeCapsuleTeam_ThrowException() {
            // Given
            Team timeCapsuleTeam = Team.builder()
                    .teamId(999)
                    .teamName("TIME_CAPSULE_2024")
                    .build();
            
            when(teamRepository.findById(999))
                    .thenReturn(Optional.of(timeCapsuleTeam));
            
            // When & Then
            assertThatThrownBy(() -> 
                teamService.getTeamDetail(999))
                .isInstanceOf(CustomException.class)
                .hasFieldOrPropertyWithValue("errorCode", ErrorCode.TEAM_NOT_FOUND);
        }
        
        @Test
        @DisplayName("회원이 속한 팀 목록 조회")
        void getMemberTeams_Success() {
            // Given
            String memberId = "kakao_123456";
            List<Team> teams = Arrays.asList(testTeam);
            
            when(memberRepository.existsById(memberId))
                    .thenReturn(true);
            when(memberQueryRepository.findTeamsByMemberId(memberId))
                    .thenReturn(teams);
            when(teamRepository.findById(1))
                    .thenReturn(Optional.of(testTeam));
            when(teamQueryRepository.findMembersByTeamId(1))
                    .thenReturn(Arrays.asList(testMember));
            
            // When
            List<TeamResponseDto> result = teamService.getMemberTeams(memberId);
            
            // Then
            assertThat(result).hasSize(1);
            assertThat(result.get(0).getTeamName()).isEqualTo("테스트팀");
        }
    }
}