package solid.backend.team.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

/**
 * 팀원 추가 요청 DTO
 * 닉네임을 받아서 팀에 멤버를 추가할 때 사용
 * @author Timemory Team
 */
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TeamMemberRequestDto {
    
    /**
     * 추가할 회원의 닉네임
     */
    private String nickname;
}