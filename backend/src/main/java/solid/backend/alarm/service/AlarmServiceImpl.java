package solid.backend.alarm.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import solid.backend.alarm.dto.AlarmDto;
import solid.backend.alarm.repository.AlarmQueryRepository;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AlarmServiceImpl implements AlarmService {
    private final AlarmQueryRepository alarmQueryRepository;

    @Override
    @Transactional
    public List<AlarmDto> getAlarmsForMember(String memberId) {
        if(memberId == null) return List.of();
        return alarmQueryRepository.findAlarmsByMemberId(memberId);
    }
}
