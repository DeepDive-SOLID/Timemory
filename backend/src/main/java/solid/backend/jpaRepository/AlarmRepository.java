package solid.backend.jpaRepository;

import org.springframework.data.jpa.repository.JpaRepository;
import solid.backend.entity.Alarm;
import solid.backend.entity.Capsule;
import solid.backend.entity.Member;

public interface AlarmRepository extends JpaRepository<Alarm, Integer> {

    /**
     * 설명 : 회원 ID로 알람 삭제
     * @param member
     */
    void deleteByMember(Member member);

    /**
     * 설명 : 캡슐 ID로 알람 삭제
     * @param capsule
     */
    void deleteByCapsule(Capsule capsule);
}
