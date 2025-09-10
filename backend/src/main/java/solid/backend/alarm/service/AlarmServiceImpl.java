package solid.backend.alarm.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import solid.backend.alarm.dto.AlarmDto;
import solid.backend.alarm.repository.AlarmQueryRepository;
import solid.backend.entity.Alarm;
import solid.backend.jpaRepository.AlarmRepository;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AlarmServiceImpl implements AlarmService {
    private final AlarmQueryRepository alarmQueryRepository;
    private final AlarmRepository alarmRepository;

    /**
     * 설명: 알림 리스트 조회
     * @param memberId
     * @return List<AlarmDto>
     */
    @Override
    @Transactional
    public List<AlarmDto> getAlarmsForMember(String memberId) {
        if(memberId == null) return List.of();
        return alarmQueryRepository.findAlarmsByMemberId(memberId);
    }

    /**
     * 설명: 알림 삭제
     * @param alarmId
     */
    @Override
    @Transactional
    public void alarmDelete(Integer alarmId) {
        Alarm alarm = alarmRepository.findById(alarmId)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 알림 ID: " + alarmId));

        alarm.setAlarmDelete(true);
        alarmRepository.save(alarm);
    }
}
