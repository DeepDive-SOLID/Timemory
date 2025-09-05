package solid.backend.team.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import solid.backend.common.FileManager;
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
    
    public static TeamMemberDto from(TeamMember teamMember, FileManager fileManager) {
        Member member = teamMember.getMember();
        return TeamMemberDto.builder()
                .memberId(member.getMemberId())
                .nickname(member.getMemberNickname())
                .profileImageUrl(fileManager.getFileUrl(member.getMemberProfile()))
                .build();
    }
    
    public static TeamMemberDto from(Member member, FileManager fileManager) {
        return TeamMemberDto.builder()
                .memberId(member.getMemberId())
                .nickname(member.getMemberNickname())
                .profileImageUrl(fileManager.getFileUrl(member.getMemberProfile()))
                .build();
    }
}