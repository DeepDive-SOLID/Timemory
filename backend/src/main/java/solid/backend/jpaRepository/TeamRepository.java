package solid.backend.jpaRepository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import solid.backend.entity.Team;

import java.util.List;
import java.util.Optional;

/**
 * 팀(그룹) JPA 레포지토리
 * 기본 CRUD 작업 제공
 * @author Timemory Team
 */
@Repository
public interface TeamRepository extends JpaRepository<Team, Integer> {

    /**
     * 기념일용 팀을 제외한 일반 팀 목록 조회
     * 팀 이름이 'TIME_CAPSULE_'로 시작하는 기념일용 팀 제외
     * @return 일반 팀 목록
     */
    @Query("SELECT t FROM Team t WHERE t.teamName NOT LIKE 'TIME_CAPSULE_%'")
    List<Team> findAllNonAnniversaryTeams();

}