package solid.backend.jpaRepository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import solid.backend.entity.Member;

import java.util.Optional;

@Repository
public interface MemberRepository extends JpaRepository<Member, String> {

    /**
     * 설명: 닉네임 찾기
     * @param nickName
     */
    Optional<Member> findByMemberNickname(String nickName);
}
