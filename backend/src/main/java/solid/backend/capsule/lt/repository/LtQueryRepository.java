package solid.backend.capsule.lt.repository;

import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;
import solid.backend.capsule.lt.dto.LtListDto;
import solid.backend.entity.QCapsule;
import solid.backend.entity.QCapsuleLT;
import solid.backend.entity.QTeam;

import java.util.List;

@Repository
@RequiredArgsConstructor
public class LtQueryRepository {

    private final JPAQueryFactory queryFactory;

    /**
     * 설명 : 캡슐 위치 리스트 정보
     * @param teamId
     * @return List<LtListDto>
     */
    public List<LtListDto> getLtList(Integer teamId) {

        QCapsule capsule = QCapsule.capsule;
        QCapsuleLT capsuleLt = QCapsuleLT.capsuleLT;
        return queryFactory
                .select(Projections.constructor(
                        LtListDto.class,
                        capsule.capId,
                        capsule.team.teamId,
                        capsule.member.memberId,
                        capsule.capText,
                        capsule.capUt,
                        capsule.capEt,
                        capsule.capImg,
                        capsule.capTag,
                        capsule.capOpen,
                        capsuleLt.capLtId,
                        capsuleLt.capLtAddr,
                        capsuleLt.capLtDetail
                ))
                .from(capsule)
                .join(capsuleLt).on(capsule.capId.eq(capsuleLt.capsule.capId))
                .where(capsule.team.teamId.eq(teamId))
                .fetch();
    }
}
