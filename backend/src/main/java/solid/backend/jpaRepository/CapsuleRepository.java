package solid.backend.jpaRepository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import solid.backend.entity.Capsule;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface CapsuleRepository extends JpaRepository<Capsule, Integer> {
    List<Capsule> findByTeamTeamId(Integer teamId);
    List<Capsule> findByCapEtBeforeAndSentFalse(LocalDateTime now);
    List<Capsule> findByTeam_TeamIdInAndCapEtBeforeAndSentFalse(List<Integer> teamIds, LocalDateTime now);
}
