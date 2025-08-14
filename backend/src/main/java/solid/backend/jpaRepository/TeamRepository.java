package solid.backend.jpaRepository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import solid.backend.entity.Team;
import solid.backend.team.repository.TeamRepositoryCustom;

import java.util.Optional;

/**
 * 팀(그룹) JPA 레포지토리
 * 기본 CRUD 및 QueryDSL 커스텀 쿼리 제공
 * @author Timemory Team
 */
@Repository
public interface TeamRepository extends JpaRepository<Team, Integer>, TeamRepositoryCustom {
    
    /**
     * 팀 이름으로 조회
     * @param teamName 팀 이름
     * @return 팀 정보 (Optional)
     */
    Optional<Team> findByTeamName(String teamName);
    
    /**
     * 팀 이름 존재 여부 확인
     * @param teamName 확인할 팀 이름
     * @return 존재 여부 (true: 존재함)
     */
    boolean existsByTeamName(String teamName);
}