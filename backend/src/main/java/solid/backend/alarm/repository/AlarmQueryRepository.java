package solid.backend.alarm.repository;

import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import jakarta.persistence.EntityManager;
import org.springframework.stereotype.Repository;
import solid.backend.alarm.dto.AlarmDto;
import solid.backend.entity.QCapsule;
import solid.backend.entity.QMember;
import solid.backend.entity.QTeam;
import solid.backend.entity.QTeamMember;

import java.util.List;

@Repository
public class AlarmQueryRepository {
    private final JPAQueryFactory queryFactory;

    public AlarmQueryRepository(EntityManager entityManager) {
        this.queryFactory = new JPAQueryFactory(entityManager);
    }

    public List<AlarmDto> findAlarmsByMemberId(String memberId) {
        QCapsule c = QCapsule.capsule;
        QTeam t = QTeam.team;
        QTeamMember tm = QTeamMember.teamMember;
        QMember m = QMember.member;

        return queryFactory
                .select(Projections.constructor(
                        AlarmDto.class,
                        t.teamName,
                        c.capOpen,
                        c.capId
                ))
                .from(c)
                .join(c.team, t)
                .join(t.teamMembers, tm)
                .join(tm.member, m)
                .where(
                        c.capSent.isTrue(),
                        m.memberId.eq(memberId)
                )
                .fetch();
    }
}
