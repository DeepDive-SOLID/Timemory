package solid.backend.capsule.space.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import solid.backend.entity.Capsule;

import java.time.LocalDateTime;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CapsuleSummaryDto {
    private Integer capsuleId;
    private String content;
    private String imageUrl;
    private String tag;
    private LocalDateTime openDate;
    private LocalDateTime createdAt;
    private Integer teamId;
    private String teamName;
    private Boolean isOpened;
    private Boolean isAnniversary;
    
    public static CapsuleSummaryDto from(Capsule capsule) {
        LocalDateTime now = LocalDateTime.now();
        boolean opened = capsule.getCapEt().isBefore(now) || capsule.getCapEt().isEqual(now);
        
        // TIME_CAPSULE_ 접두어로 기념일 캡슐 판단
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