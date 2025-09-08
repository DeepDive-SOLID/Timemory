package solid.backend.open.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class OpenListDto {

    private String annName;
    private LocalDate annDt;
    private Integer teamId;
    private List<String> memberProfiles;
}
