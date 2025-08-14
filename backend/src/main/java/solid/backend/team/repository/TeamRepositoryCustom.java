package solid.backend.team.repository;

import solid.backend.entity.Member;
import java.util.List;

/**
 * 팀 QueryDSL 커스텀 인터페이스
 * 복잡한 쿼리를 위한 확장 기능 제공
 * @author Timemory Team
 */
public interface TeamRepositoryCustom {
    
    /**
     * 팀의 모든 멤버 조회
     * @param teamId 팀 ID
     * @return 멤버 목록
     */
    List<Member> findMembersByTeamId(Integer teamId);
    
    
    /**
     * 팀 멤버 수 조회
     * @param teamId 팀 ID
     * @return 멤버 수
     */
    long countMembersByTeamId(Integer teamId);
}