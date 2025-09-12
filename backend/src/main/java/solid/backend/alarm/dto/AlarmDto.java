package solid.backend.alarm.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AlarmDto {
    private String teamName;
    private Boolean capOpen;
    private Integer capId;
    private Integer alarmId;
}
