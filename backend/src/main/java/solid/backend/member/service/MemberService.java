package solid.backend.member.service;

import solid.backend.member.dto.MemberResponseDto;
import solid.backend.team.dto.TeamResponseDto;

import java.util.List;

/**
 * 회원 관련 비즈니스 로직 인터페이스
 * @author Timemory Team
 */
public interface MemberService {
    
    /**
     * 회원 정보 조회
     * @param memberId 카카오 회원 ID
     * @return 회원 정보 DTO
     */
    MemberResponseDto getMember(String memberId);
    
    /**
     * 회원이 속한 팀 목록 조회 (상세 정보 포함)
     * @param memberId 카카오 회원 ID
     * @return 회원이 속한 팀 목록 (멤버 수, 멤버 프로필 포함)
     */
    List<TeamResponseDto> getMemberTeams(String memberId);
    
    /**
     * 닉네임으로 회원 검색
     * @param nickname 검색할 닉네임
     * @return 회원 정보 DTO
     */
    MemberResponseDto searchMemberByNickname(String nickname);
}