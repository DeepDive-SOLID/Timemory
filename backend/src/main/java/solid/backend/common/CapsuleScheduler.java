package solid.backend.common;

import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Component
@RequiredArgsConstructor
public class CapsuleScheduler {
    private final SentManager sentManager;

    @Transactional
    @Scheduled(fixedRate = 10000) // 10초마다 체크
    public void checkCapsules() {
        sentManager.checkTimeSentMessage();
    }
}
