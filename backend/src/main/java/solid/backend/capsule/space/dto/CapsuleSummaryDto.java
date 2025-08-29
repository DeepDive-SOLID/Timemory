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
    private String capsuleType;  // 캡슐 타입 추가
    
    public static CapsuleSummaryDto from(Capsule capsule) {
        LocalDateTime now = LocalDateTime.now();
        boolean opened = capsule.getCapEt().isBefore(now) || capsule.getCapEt().isEqual(now);
        
        // TIME_CAPSULE_ 접두어로 기념일 캡슐 판단
        boolean isAnniversary = capsule.getTeam() != null && 
                 capsule.getTeam().getTeamName() != null && 
                 capsule.getTeam().getTeamName().startsWith("TIME_CAPSULE_");
        
        // 캡슐 타입 판별
        String capsuleType = determineCapsuleType(capsule);
        
        return CapsuleSummaryDto.builder()
                .capsuleId(capsule.getCapId())
                .content(capsule.getCapText())
                .imageUrl(capsule.getCapImg())
                .tag(capsule.getCapTag())
                .openDate(capsule.getCapEt())
                .createdAt(capsule.getCapUt())
                .isOpened(opened)
                .isAnniversary(isAnniversary)
                .capsuleType(capsuleType)
                .teamId(capsule.getTeam() != null ? capsule.getTeam().getTeamId() : null)
                .teamName(capsule.getTeam() != null ? capsule.getTeam().getTeamName() : null)
                .build();
    }
    
    /**
     * 캡슐 타입을 판별하는 메서드
     * @param capsule 캡슐 엔티티
     * @return 캡슐 타입 문자열
     */
    private static String determineCapsuleType(Capsule capsule) {
        // 1. 기념일 캡슐 (팀명으로 구분)
        if (capsule.getTeam() != null && 
            capsule.getTeam().getTeamName() != null && 
            capsule.getTeam().getTeamName().startsWith("TIME_CAPSULE_")) {
            return "ANNIVERSARY";
        }
        
        // 2. 위치 캡슐 (OneToOne 관계 확인)
        if (capsule.getCapsuleLocation() != null) {
            return "LOCATION";
        }
        
        // 3. 조건 캡슐 (OneToOne 관계 확인)  
        if (capsule.getCapsuleCondition() != null) {
            return "CONDITION";
        }
        
        // 4. 기본 날짜 캡슐
        return "DATE";
    }
}