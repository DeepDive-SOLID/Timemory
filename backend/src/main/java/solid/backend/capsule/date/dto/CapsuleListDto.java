package solid.backend.capsule.date.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CapsuleListDto {
    private Integer capId;
    private Integer teamId;
    private String memberId;
    private String memberNickname;
    private String capText;
    private LocalDateTime capUt;
    private LocalDateTime capEt;
    private String capImg;
    private String capTag;
    private Boolean capOpen;
}
