package solid.backend.jpaRepository;

import org.springframework.data.jpa.repository.JpaRepository;
import solid.backend.entity.Capsule;

public interface CapsuleRepository extends JpaRepository<Capsule, Integer> {
}
