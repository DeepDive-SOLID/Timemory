package solid.backend.team.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;
import solid.backend.entity.Member;

import java.util.List;

import static solid.backend.entity.QMember.member;
import static solid.backend.entity.QTeamMember.teamMember;

/**
 * 팀 QueryDSL 구현체
 * TeamRepositoryCustom 인터페이스 구현
 * @author Timemory Team
 */
@Repository
@RequiredArgsConstructor
public class TeamRepositoryImpl implements TeamRepositoryCustom {
    
    private final JPAQueryFactory queryFactory;
    
    /**
     * 팀의 모든 멤버 조회
     * TeamMember 테이블을 통해 팀에 속한 멤버를 조회
     * @param teamId 팀 ID
     * @return 팀 멤버 목록
     */
    @Override
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
    @Override
    public long countMembersByTeamId(Integer teamId) {
        Long count = queryFactory
                .select(teamMember.count())
                .from(teamMember)
                .where(teamMember.team.teamId.eq(teamId))
                .fetchOne();
        return count != null ? count : 0L;
    }
}