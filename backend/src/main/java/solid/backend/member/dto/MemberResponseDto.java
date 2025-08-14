package solid.backend.member.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import solid.backend.entity.Member;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MemberResponseDto {
    
    private String id;
    private String nickname;
    private String profileImg;
    
    public static MemberResponseDto from(Member member) {
        return MemberResponseDto.builder()
                .id(member.getMemberId())
                .nickname(member.getMemberNickname())
                .profileImg(member.getMemberProfile())
                .build();
    }
}