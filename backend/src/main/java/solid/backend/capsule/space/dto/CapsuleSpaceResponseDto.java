package solid.backend.capsule.space.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CapsuleSpaceResponseDto {
    private String memberId;
    private String memberNickname;
    private Integer totalCapsules;
    private List<CapsuleSummaryDto> capsules;
}