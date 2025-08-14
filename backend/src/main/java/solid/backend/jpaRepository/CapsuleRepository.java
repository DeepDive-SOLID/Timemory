package solid.backend.jpaRepository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import solid.backend.entity.Capsule;
import solid.backend.entity.Member;
import solid.backend.entity.Team;

import java.util.List;

@Repository
public interface CapsuleRepository extends JpaRepository<Capsule, Integer> {
    
    // 팀의 모든 캡슐 조회
    List<Capsule> findByTeam(Team team);
    
    // 멤버가 작성한 모든 캡슐 조회
    List<Capsule> findByMember(Member member);
    
    // 팀과 멤버로 캡슐 조회
    List<Capsule> findByTeamAndMember(Team team, Member member);
    
    // 열린 캡슐만 조회
    List<Capsule> findByCapOpenTrue();
    
    // 닫힌 캡슐만 조회
    List<Capsule> findByCapOpenFalse();
    
    // 팀의 모든 캡슐 삭제
    void deleteByTeam(Team team);
    
    // 특정 멤버의 모든 캡슐 삭제
    void deleteByMember(Member member);
    
    // 팀과 멤버의 캡슐 삭제
    void deleteByTeamAndMember(Team team, Member member);
}