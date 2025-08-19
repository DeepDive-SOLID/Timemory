package solid.backend.open.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class OpenCapsuleListDto {

    private String capText;
    private LocalDateTime capUt;
    private String memberNickname;
}
