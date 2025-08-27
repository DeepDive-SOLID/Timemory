package solid.backend.capsule.space.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import solid.backend.entity.Capsule;

import java.time.LocalDateTime;

/**
 * 캡슐 요약 정보 DTO
 * 캡슐 공간에서 표시할 캡슐의 기본 정보를 담는 DTO
 */
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CapsuleSummaryDto {
    
    private Integer capsuleId;
    private String content;
    private String imageUrl;
    private String tag;
    private LocalDateTime openDate;
    private LocalDateTime createdAt;
    private boolean isOpened;
    private boolean isAnniversary;  // 기념일 캡슐 여부
    private Integer teamId;
    private String teamName;
    
    /**
     * Capsule 엔티티를 CapsuleSummaryDto로 변환
     * 
     * @param capsule 캡슐 엔티티
     * @return 캡슐 요약 DTO
     */
    public static CapsuleSummaryDto from(Capsule capsule) {
        LocalDateTime now = LocalDateTime.now();
        boolean opened = capsule.getCapEt().isBefore(now) || capsule.getCapEt().isEqual(now);
        
        // 기념일 캡슐 여부 확인 (팀 이름이 TIME_CAPSULE_로 시작)
        boolean isAnniversary = capsule.getTeam() != null && 
                 capsule.getTeam().getTeamName() != null && 
                 capsule.getTeam().getTeamName().startsWith("TIME_CAPSULE_");
        
        return CapsuleSummaryDto.builder()
                .capsuleId(capsule.getCapId())
                .content(capsule.getCapText())
                .imageUrl(capsule.getCapImg())
                .tag(capsule.getCapTag())
                .openDate(capsule.getCapEt())
                .createdAt(capsule.getCapUt())
                .isOpened(opened)
                .isAnniversary(isAnniversary)
                .teamId(capsule.getTeam() != null ? capsule.getTeam().getTeamId() : null)
                .teamName(capsule.getTeam() != null ? capsule.getTeam().getTeamName() : null)
                .build();
    }
}