package solid.backend.capsule.space.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

/**
 * 캡슐 공간 응답 DTO
 * 사용자의 캡슐 공간 정보를 담는 DTO
 */
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CapsuleSpaceResponseDto {
    
    private String memberId;
    private String memberNickname;
    private int totalCapsules;
    private List<CapsuleSummaryDto> capsules;
}