package solid.backend.team.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;
import solid.backend.entity.Member;

import java.util.List;

import static solid.backend.entity.QMember.member;
import static solid.backend.entity.QTeamMember.teamMember;

/**
 * 팀 관련 QueryDSL 전용 리포지토리
 * 복잡한 쿼리 및 조인 연산을 처리
 * @author Timemory Team
 */
@Repository
@RequiredArgsConstructor
public class TeamQueryRepository {
    
    private final JPAQueryFactory queryFactory;
    
    /**
     * 팀의 모든 멤버 조회
     * TeamMember 테이블을 통해 팀에 속한 멤버를 조회
     * @param teamId 팀 ID
     * @return 팀 멤버 목록
     */
    public List<Member> findMembersByTeamId(Integer teamId) {
        return queryFactory
                .select(member)
                .from(teamMember)
                .join(teamMember.member, member)
                .where(teamMember.team.teamId.eq(teamId))
                .fetch();
    }
    
    /**
     * 팀 멤버 수 조회
     * 팀에 속한 멤버의 수를 카운트
     * @param teamId 팀 ID
     * @return 팀 멤버 수 (없으면 0 반환)
     */
    public long countMembersByTeamId(Integer teamId) {
        Long count = queryFactory
                .select(teamMember.count())
                .from(teamMember)
                .where(teamMember.team.teamId.eq(teamId))
                .fetchOne();
        return count != null ? count : 0L;
    }
}