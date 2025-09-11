package solid.backend.capsule.lt.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class LtListDto {

    private Integer capId;
    private Integer teamId;
    private String memberId;
    private String capText;
    private LocalDateTime capUt;
    private LocalDateTime capEt;
    private String capImg;
    private String capTag;
    private Boolean capOpen;
    private Integer capLtId;
    private String capLtAddr;
    private String capLtDetail;
}
