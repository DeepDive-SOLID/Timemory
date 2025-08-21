package solid.backend.team.service;

import solid.backend.member.dto.MemberProfileDto;
import solid.backend.team.dto.TeamCreateRequestDto;
import solid.backend.team.dto.TeamMemberDto;
import solid.backend.team.dto.TeamRequestDto;
import solid.backend.team.dto.TeamResponseDto;

import java.util.List;

/**
 * 팀(그룹) 관련 비즈니스 로직 인터페이스
 * @author Timemory Team
 */
public interface TeamService {
    
    /**
     * 새로운 팀 생성 및 멤버 초대
     * @param requestDto 팀 생성 요청 정보
     * @param creatorId 팀 생성자 ID
     * @return 생성된 팀 정보
     */
    TeamResponseDto createTeam(TeamCreateRequestDto requestDto, String creatorId);
    
    /**
     * 전체 팀 목록 조회
     * @return 전체 팀 목록
     */
    List<TeamResponseDto> getAllTeams();
    
    /**
     * 팀에 속한 멤버 목록 조회
     * @param teamId 팀 ID
     * @return 팀 멤버 목록
     */
    List<TeamMemberDto> getTeamMembers(Integer teamId);
    
    /**
     * 팀 탈퇴 처리
     * @param teamId 팀 ID
     * @param memberId 탈퇴할 회원 ID
     * @param requesterId 요청자 ID
     */
    void leaveTeam(Integer teamId, String memberId, String requesterId);
    
    /**
     * 팀에 새로운 멤버 추가 (닉네임으로)
     * @param teamId 팀 ID
     * @param nickname 추가할 회원의 닉네임
     * @return 추가된 멤버의 프로필 정보
     */
    MemberProfileDto addTeamMemberByNickname(Integer teamId, String nickname);
    
    /**
     * 팀 정보 수정
     * @param teamId 팀 ID
     * @param requestDto 수정할 팀 정보
     * @return 수정된 팀 상세 정보
     */
    TeamResponseDto updateTeam(Integer teamId, TeamRequestDto requestDto);
    
    /**
     * 특정 회원이 속한 팀 목록 조회
     * @param memberId 카카오 회원 ID
     * @return 회원이 속한 팀 목록
     */
    List<TeamResponseDto> getMemberTeams(String memberId);
    
    /**
     * 팀 상세 정보 조회
     * @param teamId 팀 ID
     * @return 팀 상세 정보
     */
    TeamResponseDto getTeamDetail(Integer teamId);
}