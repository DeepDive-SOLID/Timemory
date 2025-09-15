package solid.backend.alarm.repository;

import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.CaseBuilder;
import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.jpa.impl.JPAQueryFactory;
import jakarta.persistence.EntityManager;
import org.springframework.stereotype.Repository;
import solid.backend.alarm.dto.AlarmDto;
import solid.backend.entity.*;

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
        QMember m = QMember.member;
        QAlarm a = QAlarm.alarm;

        return queryFactory
                .select(Projections.constructor(
                        AlarmDto.class,
                        new CaseBuilder()
                                .when(t.teamName.startsWith("TIME_CAPSULE_"))
                                .then(Expressions.stringTemplate("SUBSTR({0}, 14)", t.teamName))
                                .otherwise(t.teamName),
                        c.capOpen,
                        c.capId,
                        a.alarmId
                ))
                .from(a)
                .join(a.capsule, c)
                .join(c.team, t)
                .join(a.member, m)
                .where(
                        c.capSent.isTrue(),
                        a.alarmDelete.isFalse(),
                        m.memberId.eq(memberId)
                )
                .fetch();
    }
}
