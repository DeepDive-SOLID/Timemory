package solid.backend.jpaRepository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import solid.backend.entity.Team;

import java.util.Optional;

/**
 * 팀(그룹) JPA 레포지토리
 * 기본 CRUD 작업 제공
 * @author Timemory Team
 */
@Repository
public interface TeamRepository extends JpaRepository<Team, Integer> {
    
}