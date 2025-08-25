package solid.backend.team.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import solid.backend.entity.Team;
import solid.backend.member.dto.MemberProfileDto;

import java.util.List;

/**
 * 팀 정보 응답 DTO
 * 팀 정보와 멤버 수, 멤버 프로필 포함
 * @author Timemory Team
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TeamResponseDto {
    
    /**
     * 팀 ID
     */
    private Integer teamId;
    
    /**
     * 팀 이름
     */
    private String teamName;
    
    /**
     * 총 멤버 수
     */
    private Integer memberCount;
    
    /**
     * 멤버들 프로필 정보
     */
    private List<MemberProfileDto> members;
    
    /**
     * Entity를 간단한 DTO로 변환 (멤버 정보 없음)
     */
    public static TeamResponseDto from(Team team) {
        return TeamResponseDto.builder()
                .teamId(team.getTeamId())
                .teamName(team.getTeamName())
                .build();
    }
}