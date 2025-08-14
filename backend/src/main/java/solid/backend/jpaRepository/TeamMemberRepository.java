package solid.backend.jpaRepository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import solid.backend.entity.Member;
import solid.backend.entity.Team;
import solid.backend.entity.TeamMember;
import solid.backend.entity.TeamMemberId;

import java.util.List;
import java.util.Optional;

@Repository
public interface TeamMemberRepository extends JpaRepository<TeamMember, TeamMemberId> {
    
    // 팀의 모든 멤버 조회
    List<TeamMember> findByTeam(Team team);
    
    // 팀 ID로 모든 멤버 조회
    List<TeamMember> findByTeamTeamId(Integer teamId);
    
    // 특정 멤버가 속한 모든 팀 조회
    List<TeamMember> findByMember(Member member);
    
    // 팀과 멤버로 조회
    Optional<TeamMember> findByTeamAndMember(Team team, Member member);
    
    // 팀에 멤버가 존재하는지 확인
    boolean existsByTeamAndMember(Team team, Member member);
    
    // 팀의 멤버 수 카운트
    long countByTeam(Team team);
    
    // 팀과 멤버로 삭제
    void deleteByTeamAndMember(Team team, Member member);
    
    // 팀의 모든 멤버 삭제
    void deleteByTeam(Team team);
    
    // 특정 멤버의 모든 팀 관계 삭제
    void deleteByMember(Member member);
}