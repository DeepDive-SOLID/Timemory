package solid.backend.team.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

/**
 * 팀 생성 요청 DTO
 * 팀명과 초대할 닉네임 리스트를 받음
 * @author Timemory Team
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TeamCreateRequestDto {
    
    /**
     * 팀 이름
     */
    private String teamName;
    
    /**
     * 초대할 멤버들의 닉네임 리스트
     * 생성자는 자동으로 포함되므로 추가 멤버만 포함
     */
    private List<String> inviteNicknames;
}