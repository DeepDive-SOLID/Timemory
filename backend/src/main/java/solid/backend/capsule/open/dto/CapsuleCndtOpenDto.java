package solid.backend.capsule.open.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CapsuleCndtOpenDto {
    private Integer capId;
    private Integer teamId;
    private String memberId;
    private String capText;
    private LocalDateTime capUt;
    private LocalDateTime capEt;
    private String capImg;
    private String capTag;
    private Boolean capOpen;

    private String capCndtCase;
}
