package solid.backend.alarm.service;

import solid.backend.alarm.dto.AlarmDto;

import java.util.List;

public interface AlarmService {
    /**
     * 설명: 알림 리스트 조회
     * @param memberId
     * @return List<AlarmDto>
     */
    List<AlarmDto> getAlarmsForMember(String memberId);

    /**
     * 설명: 알림 삭제
     * @param alarmId
     */
    void alarmDelete(Integer alarmId);
}
