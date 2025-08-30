package solid.backend.common;

import jakarta.mail.MessagingException;
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
    private final MailManager mailManager;

    @Transactional
    @Scheduled(fixedRate = 10000) // 10초마다 체크
    public void checkCapsules() {
        LocalDateTime now = LocalDateTime.now();

        // 만료 & 미전송 캡슐 전체 조회 (로그인 여부 무관)
        List<Capsule> targets = capsuleRepository.findByCapEtBeforeAndCapSentFalse(now);

        for (Capsule c : targets) {
            boolean kakaoOk = false;
            boolean mailOk  = false;

            // 카카오 알림 (카카오 로그인 사용자에게만)
            if (tokenStore.hasToken() && tokenStore.hasMemberId()) {
                try {
                    kakaoMessage.sendMessage(
                            "캡슐이 열렸습니다 !! \\n서비스를 통해 확인해주세요. \\n http://timemory.kro.kr/"
                    );
                    kakaoOk = true;
                } catch (Exception e) {
                    System.out.println("카카오 전송 실패: " + e.getMessage());
                }
            } else {
                System.out.println("로그인 토큰 없음 → 카카오 알림 건너뜀");
            }

            // 메일 알림 (팀 전체 멤버에게)
            try {
                Integer teamId = c.getTeam().getTeamId();
                List<TeamMember> teamMembers = teamMemberRepository.findByTeam_TeamId(teamId);
                List<String> recipientEmails = teamMembers.stream()
                        .map(tm -> tm.getMember())
                        .filter(m -> m != null)
                        .map(m -> m.getMemberEmail())
                        .filter(email -> email != null && !email.isBlank())
                        .distinct()
                        .toList();

                if (!recipientEmails.isEmpty()) {
                    String subject = "[Timemory] 캡슐이 열렸습니다!";
                    String html = """
                        <div>
                          <p>팀의 캡슐이 열렸습니다 !!</p>
                          <p><a href="http://timemory.kro.kr/">서비스에서 바로 확인하기</a></p>
                        </div>
                        """;
                    mailManager.sendHtmlBcc(recipientEmails, subject, html);
                    mailOk = true;
                } else {
                    System.out.println("팀 멤버 이메일 없음 → 메일 전송 생략");
                }
            } catch (MessagingException e) {
                System.out.println("메일 전송 실패: " + e.getMessage());
            }

            // 둘 중 하나라도 성공하면 sent 처리
            if (kakaoOk || mailOk) {
                c.setCapSent(true);
                capsuleRepository.save(c);
            }
        }
    }
}
