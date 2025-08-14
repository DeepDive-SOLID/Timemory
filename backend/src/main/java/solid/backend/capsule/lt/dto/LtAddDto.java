package solid.backend.capsule.lt.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class LtAddDto {

    private Integer teamId;
    private String memberId;
    private String capText;
    private LocalDateTime capUt;
    private MultipartFile capImg;
    private String capTag;
    private String capLtAddr;
    private String capLtDetail;
}
