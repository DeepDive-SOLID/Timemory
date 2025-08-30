package solid.backend.alarm.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
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

    @ResponseBody
    @PostMapping("/list")
    public List<AlarmDto> getAlarms(@RequestBody String memberId) {
        return alarmService.getAlarmsForMember(memberId);
    }
}
