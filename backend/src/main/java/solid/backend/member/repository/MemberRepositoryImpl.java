package solid.backend.member.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;
import solid.backend.entity.Team;

import java.util.List;

import static solid.backend.entity.QTeam.team;
import static solid.backend.entity.QTeamMember.teamMember;

/**
 * 회원 QueryDSL 구현체
 * MemberRepositoryCustom 인터페이스 구현
 * @author Timemory Team
 */
@Repository
@RequiredArgsConstructor
public class MemberRepositoryImpl implements MemberRepositoryCustom {
    
    private final JPAQueryFactory queryFactory;
    
    /**
     * 회원이 속한 모든 팀 조회
     * TeamMember 테이블을 통해 회원과 연관된 팀을 조회
     * @param memberId 카카오 회원 ID
     * @return 회원이 속한 팀 목록
     */
    @Override
    public List<Team> findTeamsByMemberId(String memberId) {
        return queryFactory
                .select(team)
                .from(teamMember)
                .join(teamMember.team, team)
                .where(teamMember.member.memberId.eq(memberId))
                .fetch();
    }
}