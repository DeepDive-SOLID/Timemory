package solid.backend.alarm.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import solid.backend.alarm.dto.AlarmDto;
import solid.backend.alarm.service.AlarmService;

import java.util.List;

@Controller
@RequiredArgsConstructor
@RequestMapping("/api/alarm")
public class AlarmController {
    private final AlarmService alarmService;

    /**
     * 설명: 알림 리스트 조회
     * @param memberId
     * @return
     */
    @ResponseBody
    @PostMapping("/list")
    public List<AlarmDto> getAlarms(@RequestBody String memberId) {
        return alarmService.getAlarmsForMember(memberId);
    }

    /**
     * 설명: 알림 삭제
     * @param alarmId
     * @return
     */
    @ResponseBody
    @PostMapping("/del")
    public ResponseEntity<String> deleteAlarm(@RequestBody Integer alarmId) {
        try {
            alarmService.alarmDelete(alarmId);
            return ResponseEntity.ok("SUCCESS");
        } catch (Exception e) {
            e.printStackTrace();
            return   ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("FAIL");
        }
    }
}
