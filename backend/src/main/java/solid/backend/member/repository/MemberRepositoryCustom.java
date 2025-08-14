package solid.backend.member.repository;

import solid.backend.entity.Team;
import java.util.List;

/**
 * 회원 QueryDSL 커스텀 인터페이스
 * 복잡한 쿼리를 위한 확장 기능 제공
 * @author Timemory Team
 */
public interface MemberRepositoryCustom {
    
    /**
     * 회원이 속한 모든 팀 조회
     * 
     * @param memberId 카카오 회원 ID
     * @return 팀 목록
     */
    List<Team> findTeamsByMemberId(String memberId);
}