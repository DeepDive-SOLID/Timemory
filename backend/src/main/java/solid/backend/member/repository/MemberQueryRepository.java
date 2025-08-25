package solid.backend.member.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;
import solid.backend.entity.Team;

import java.util.List;

import static solid.backend.entity.QTeam.team;
import static solid.backend.entity.QTeamMember.teamMember;

/**
 * 회원 관련 QueryDSL 전용 리포지토리
 * 복잡한 쿼리 및 조인 연산을 처리
 * @author Timemory Team
 */
@Repository
@RequiredArgsConstructor
public class MemberQueryRepository {
    
    private final JPAQueryFactory queryFactory;
    
    /**
     * 회원이 속한 모든 팀 조회 (기념일용 팀 제외)
     * TeamMember 테이블을 통해 회원과 연관된 팀을 조회
     * 팀 이름이 'TIME_CAPSULE_'로 시작하는 기념일용 팀 제외
     * @param memberId 카카오 회원 ID
     * @return 회원이 속한 일반 팀 목록
     */
    public List<Team> findTeamsByMemberId(String memberId) {
        return queryFactory
                .select(team)
                .from(teamMember)
                .join(teamMember.team, team)
                .where(teamMember.member.memberId.eq(memberId)
                        .and(team.teamName.notLike("TIME_CAPSULE_%")))
                .fetch();
    }
    
    /**
     * 회원이 속한 모든 팀 조회 (기념일용 팀 포함)
     * 캡슐 스페이스에서 사용하기 위한 메서드
     * 기념일용 팀을 포함한 모든 팀 조회
     * @param memberId 카카오 회원 ID
     * @return 회원이 속한 모든 팀 목록 (기념일용 팀 포함)
     */
    public List<Team> findAllTeamsByMemberId(String memberId) {
        return queryFactory
                .select(team)
                .from(teamMember)
                .join(teamMember.team, team)
                .where(teamMember.member.memberId.eq(memberId))
                .fetch();
    }
}