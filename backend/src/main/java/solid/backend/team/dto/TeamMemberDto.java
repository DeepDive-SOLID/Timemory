package solid.backend.team.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import solid.backend.entity.Member;
import solid.backend.entity.TeamMember;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TeamMemberDto {
    
    private String memberId;
    private String nickname;
    private String profileImageUrl;
    
    public static TeamMemberDto from(TeamMember teamMember) {
        Member member = teamMember.getMember();
        return TeamMemberDto.builder()
                .memberId(member.getMemberId())
                .nickname(member.getMemberNickname())
                .profileImageUrl(member.getMemberProfile())
                .build();
    }
    
    public static TeamMemberDto from(Member member) {
        return TeamMemberDto.builder()
                .memberId(member.getMemberId())
                .nickname(member.getMemberNickname())
                .profileImageUrl(member.getMemberProfile())
                .build();
    }
}