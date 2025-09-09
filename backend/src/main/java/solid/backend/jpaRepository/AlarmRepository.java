package solid.backend.jpaRepository;

import org.springframework.data.jpa.repository.JpaRepository;
import solid.backend.entity.Alarm;

public interface AlarmRepository extends JpaRepository<Alarm, Integer> {
}
