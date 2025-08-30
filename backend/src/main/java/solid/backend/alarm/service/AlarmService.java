package solid.backend.alarm.service;

import solid.backend.alarm.dto.AlarmDto;

import java.util.List;

public interface AlarmService {
    List<AlarmDto> getAlarmsForMember(String memberId);
}
