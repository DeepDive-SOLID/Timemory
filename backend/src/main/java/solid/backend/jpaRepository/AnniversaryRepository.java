package solid.backend.jpaRepository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import solid.backend.entity.Anniversary;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface AnniversaryRepository extends JpaRepository<Anniversary, Integer> {
    
    // 기념일 이름으로 조회
    Optional<Anniversary> findByAnnName(String annName);
    
    // 특정 날짜의 기념일 조회
    List<Anniversary> findByAnnDt(LocalDate annDt);
    
    // 기념일 이름 존재 여부 확인
    boolean existsByAnnName(String annName);
}