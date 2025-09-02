package solid.backend.jpaRepository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import solid.backend.entity.TeamMember;
import solid.backend.entity.TeamMemberId;

import java.util.List;

@Repository
public interface TeamMemberRepository extends JpaRepository<TeamMember, TeamMemberId> {
    
    /**
     * 팀 ID로 모든 멤버 조회
     * @param teamId 팀 ID
     * @return 팀 멤버 목록
     */
    List<TeamMember> findByTeamTeamId(Integer teamId);
}
