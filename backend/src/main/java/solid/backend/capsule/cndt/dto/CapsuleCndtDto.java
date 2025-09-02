package solid.backend.capsule.cndt.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CapsuleCndtDto {
    private Integer teamId;
    private String memberId;
    private String capText;
    private LocalDateTime capEt;
    private MultipartFile capImg;
    private String capTag;

    private String capCndtCase;
}
