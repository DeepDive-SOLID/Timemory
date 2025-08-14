package solid.backend.jpaRepository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import solid.backend.entity.Capsule;

import java.util.List;

@Repository
public interface CapsuleRepository extends JpaRepository<Capsule, Integer> {
    List<Capsule> findByTeamTeamId(Integer teamId);
}
