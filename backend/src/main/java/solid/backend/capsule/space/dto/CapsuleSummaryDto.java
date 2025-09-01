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
        // 캡슐 타입 먼저 판별
        String capsuleType = determineCapsuleType(capsule);
        
        // 타입에 따라 열림 여부 계산
        boolean opened = calculateIsOpened(capsule, capsuleType);
        
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
                .capsuleType(capsuleType)
                .teamId(capsule.getTeam() != null ? capsule.getTeam().getTeamId() : null)
                .teamName(capsule.getTeam() != null ? capsule.getTeam().getTeamName() : null)
                .build();
    }
    
    /**
     * 캡슐 타입에 따라 열림 여부를 계산하는 메서드
     * @param capsule 캡슐 엔티티
     * @param capsuleType 캡슐 타입
     * @return 열림 여부
     */
    private static boolean calculateIsOpened(Capsule capsule, String capsuleType) {
        switch (capsuleType) {
            case "DATE":
            case "ANNIVERSARY":
                // 날짜/기념일 캡슐: 만료일자와 현재 시간 비교
                LocalDateTime now = LocalDateTime.now();
                return capsule.getCapEt().isBefore(now) || capsule.getCapEt().isEqual(now);
                
            case "LOCATION":
            case "CONDITION":
                // 위치/조건 캡슐: DB의 cap_open 값 사용
                return capsule.getCapOpen() != null && capsule.getCapOpen();
                
            default:
                // 기본값: 날짜 기반 계산
                LocalDateTime defaultNow = LocalDateTime.now();
                return capsule.getCapEt().isBefore(defaultNow) || capsule.getCapEt().isEqual(defaultNow);
        }
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