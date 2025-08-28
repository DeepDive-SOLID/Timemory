package solid.backend.common;

import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import solid.backend.entity.Capsule;
import solid.backend.entity.TeamMember;
import solid.backend.jpaRepository.CapsuleRepository;
import solid.backend.jpaRepository.TeamMemberRepository;
import solid.backend.util.TokenStore;

import java.time.LocalDateTime;
import java.util.List;

@Component
@RequiredArgsConstructor
public class CapsuleScheduler {
    private final CapsuleRepository capsuleRepository;
    private final KakaoMessage kakaoMessage;
    private final TeamMemberRepository teamMemberRepository;
    private final TokenStore tokenStore;

    @Transactional
    @Scheduled(fixedRate = 10000) // 10초마다 체크
    public void checkCapsules() {
        if (!tokenStore.hasToken() || !tokenStore.hasMemberId()) {
            System.out.println("토큰 또는 memberId 없음. 전송 생략");
            return;
        }

        String memberId = tokenStore.getMemberId();
        List<TeamMember> teamMembers = teamMemberRepository.findByMemberMemberId(memberId);
        if (teamMembers.isEmpty()) {
            System.out.println("팀 미소속 사용자: " + memberId);
            return;
        }

        // 사용자 소속 팀 ID들
        List<Integer> teamIds = teamMembers.stream()
                .map(tm -> tm.getTeam().getTeamId())
                .distinct()
                .toList();

        // 해당 팀들의 만료 & 미전송 캡슐을 한 번에 조회
        LocalDateTime now = LocalDateTime.now();
        List<Capsule> targets =
                capsuleRepository.findByTeam_TeamIdInAndCapEtBeforeAndSentFalse(teamIds, now);

        for (Capsule c : targets) {
            try {
                kakaoMessage.sendMessage("캡슐이 열렸습니다 !! \\n서비스를 통해 확인해주세요. \\n http://timemory.kro.kr/");
                c.setSent(true);
                capsuleRepository.save(c);
            } catch (Exception e) {
                System.out.println("❌ 전송 실패: " + e.getMessage());
            }
        }
    }
}
