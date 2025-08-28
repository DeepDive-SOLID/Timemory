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

        // 해당 팀의 모든 멤버 이메일 수집
        List<TeamMember> teamAllMembers = teamMemberRepository.findByTeam_TeamIdIn(teamIds);
        List<String> recipientEmails = teamAllMembers.stream()
                .map(tm -> tm.getMember())
                .filter(m -> m != null)
                .map(m -> m.getMemberEmail())
                .filter(email -> email != null && !email.isBlank())
                .distinct()
                .toList();

        if (recipientEmails.isEmpty()) {
            System.out.println("팀 멤버 이메일이 없어 메일 전송 생략");
        }

        // 해당 팀들의 만료 & 미전송 캡슐을 한 번에 조회
        LocalDateTime now = LocalDateTime.now();
        List<Capsule> targets =
                capsuleRepository.findByTeam_TeamIdInAndCapEtBeforeAndSentFalse(teamIds, now);

        for (Capsule c : targets) {
            boolean kakaoOk = false;
            boolean mailOk = false;

            // 카카오 메시지 전송
            try {
                kakaoMessage.sendMessage("캡슐이 열렸습니다 !! \\n서비스를 통해 확인해주세요. \\n http://timemory.kro.kr/");
                kakaoOk = true;
            } catch (Exception e) {
                System.out.println("전송 실패: " + e.getMessage());
            }

            // 메일 전송
            try {
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
                }
            } catch (MessagingException e) {
                System.out.println("메일 전송 실패: " + e.getMessage());
            }

            // 둘 중 하나만 성공해도 'sent' 처리
            if (kakaoOk || mailOk) {
                c.setSent(true);
                capsuleRepository.save(c);
            }
        }
    }
}
