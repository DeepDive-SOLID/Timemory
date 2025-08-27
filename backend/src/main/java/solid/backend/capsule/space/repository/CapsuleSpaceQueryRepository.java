package solid.backend.capsule.space.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;
import solid.backend.entity.Capsule;

import java.util.List;

import static solid.backend.entity.QCapsule.capsule;
import static solid.backend.entity.QTeam.team;
import static solid.backend.entity.QMember.member;

/**
 * 캡슐 공간 관련 QueryDSL 리포지토리
 * 사용자가 작성한 모든 캡슐을 조회하는 기능 제공
 */
@Repository
@RequiredArgsConstructor
public class CapsuleSpaceQueryRepository {
    
    private final JPAQueryFactory queryFactory;
    
    /**
     * 사용자가 작성한 모든 캡슐 조회
     * 기념일 캡슐과 일반 캡슐 모두 포함
     * fetch join을 사용하여 N+1 문제 해결
     * 
     * @param memberId 사용자 ID
     * @return 사용자가 작성한 모든 캡슐 목록
     */
    public List<Capsule> findCapsulesByMemberId(String memberId) {
        return queryFactory
                .selectFrom(capsule)
                .leftJoin(capsule.team, team).fetchJoin()  // Team fetch join으로 N+1 방지
                .leftJoin(capsule.member, member).fetchJoin()  // Member fetch join으로 N+1 방지
                .where(capsule.member.memberId.eq(memberId))
                .orderBy(capsule.capUt.desc())
                .fetch();
    }
}