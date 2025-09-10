package solid.backend.capsule.detail.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CapsuleDetailDto {

    private String capText;
    private LocalDateTime capUt;
    private String capTag;
    private String capImg;
    private String teamName;
    private List<String> memberProfiles;
}
