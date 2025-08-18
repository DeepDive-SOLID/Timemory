package solid.backend.jpaRepository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import solid.backend.entity.Member;
import solid.backend.member.repository.MemberRepositoryCustom;

import java.util.List;
import java.util.Optional;

/**
 * 회원 JPA 레포지토리
 * 기본 CRUD 및 QueryDSL 커스텀 쿼리 제공
 * @author Timemory Team
 */
@Repository
public interface MemberRepository extends JpaRepository<Member, String>, MemberRepositoryCustom {
    
    /**
     * 닉네임으로 회원 조회
     * @param nickname 회원 닉네임
     * @return 회원 정보 (Optional)
     */
    Optional<Member> findByMemberNickname(String nickname);
    
    /**
     * 이메일로 회원 조회
     * @param email 회원 이메일
     * @return 회원 정보 (Optional)
     */
    Optional<Member> findByMemberEmail(String email);
    
    /**
     * 닉네임 중복 체크
     * @param nickname 확인할 닉네임
     * @return 중복 여부 (true: 중복됨)
     */
    boolean existsByMemberNickname(String nickname);
    
    /**
     * 이메일 중복 체크
     * @param email 확인할 이메일
     * @return 중복 여부 (true: 중복됨)
     */
    boolean existsByMemberEmail(String email);
    
    /**
     * 닉네임 부분 검색
     * @param nicknameKeyword 검색 키워드
     * @return 닉네임에 키워드를 포함하는 회원 목록
     */
    List<Member> findByMemberNicknameContaining(String nicknameKeyword);
}
