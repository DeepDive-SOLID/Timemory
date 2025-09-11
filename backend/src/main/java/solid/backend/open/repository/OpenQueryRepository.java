package solid.backend.open.repository;
import com.querydsl.core.Tuple;
import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.cglib.core.Local;
import org.springframework.stereotype.Repository;
import solid.backend.entity.*;
import solid.backend.open.dto.OpenCapsuleListDto;
import solid.backend.open.dto.OpenListDto;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

@Repository
@RequiredArgsConstructor
public class OpenQueryRepository {

    private final JPAQueryFactory queryFactory;

    /**
     * 설명 : 오픈 그룹 리스트 정보
     * @return List<OpenDto>
     */
    public List<OpenListDto> getOpenList() {

        QAnniversary anniversary = QAnniversary.anniversary;
        QTeam team = QTeam.team;
        QTeamMember teamMember = QTeamMember.teamMember;
        QMember member = QMember.member;

        List<Tuple> rows = queryFactory
                .select(anniversary.annId,
                        anniversary.annName,
                        anniversary.annDt,
                        team.teamId,
                        member.memberProfile)
                .from(anniversary)
                .leftJoin(team).on(team.teamName.eq(
                        Expressions.stringTemplate("concat('TIME_CAPSULE_', {0})", anniversary.annName)
                ))
                .leftJoin(teamMember).on(team.teamId.eq(teamMember.team.teamId))
                .leftJoin(member).on(teamMember.member.memberId.eq(member.memberId))
                .fetch();

        // annId 기준으로 수동 그룹핑
        Map<Integer, OpenListDto> result = new LinkedHashMap<>();
        for (Tuple row : rows) {
            Integer annId = row.get(anniversary.annId);
            OpenListDto dto = result.computeIfAbsent(annId, id ->
                    new OpenListDto(
                            row.get(anniversary.annName),
                            row.get(anniversary.annDt),
                            row.get(team.teamId),
                            new ArrayList<>()
                    )
            );

            String profile = row.get(member.memberProfile);
            if (profile != null) {
                dto.getMemberProfiles().add(profile);
            }
        }

        return new ArrayList<>(result.values());
    }

    /**
     * 설명 : 오픈 그룹 캡슐 리스트 정보
     * @param teamId
     * @return List<OpenCapsuleListDto>
     */
    public List<OpenCapsuleListDto> getOpenCapsuleList(Integer teamId) {
        QCapsule capsule = QCapsule.capsule;

        return queryFactory
                .select(Projections.bean(OpenCapsuleListDto.class,
                        capsule.capId,
                        capsule.capText,
                        capsule.capUt,
                        capsule.member.memberNickname,
                        capsule.capEt))
                .from(capsule)
                .where(capsule.team.teamId.eq(teamId))
                .fetch();
    }


    /**
     * 설명 : 기념일 날짜 조회
     * @param teamId
     * @return LocalDate
     */
    public LocalDateTime getAnnDt(Integer teamId) {
        QAnniversary anniversary = QAnniversary.anniversary;
        QTeam team = QTeam.team;
        LocalDate annDt = queryFactory
                .select(anniversary.annDt)
                .from(team)
                .join(anniversary).on(team.teamName.eq(Expressions.stringTemplate("concat('TIME_CAPSULE_', {0})", anniversary.annName)))
                .where(team.teamId.eq(teamId))
                .fetchOne();

        LocalDateTime result = null;
        if (annDt != null) {
            result = annDt.atStartOfDay();
        }
        return result;
    }
}
