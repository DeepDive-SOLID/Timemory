package solid.backend.member.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import solid.backend.entity.Member;

/**
 * 멤버 프로필 정보 DTO
 * 팀 멤버 목록 표시용
 * @author Timemory Team
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MemberProfileDto {
    
    /**
     * 회원 ID
     */
    private String memberId;
    
    /**
     * 닉네임
     */
    private String nickname;
    
    /**
     * 프로필 이미지 URL
     */
    private String profileImg;
    
    /**
     * Entity -> DTO 변환
     */
    public static MemberProfileDto from(Member member) {
        return MemberProfileDto.builder()
                .memberId(member.getMemberId())
                .nickname(member.getMemberNickname())
                .profileImg(member.getMemberProfile())
                .build();
    }
}