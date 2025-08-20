package solid.backend.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.Comment;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "member")
public class Member {

    @Id
    @Column(name = "member_id", length = 50)
    @Comment("회원 ID")
    private String memberId;

    @Column(name = "member_profile", length = 200)
    @Comment("프로필 이미지")
    private String memberProfile;

    @Column(name = "member_name", length = 20, nullable = false)
    @Comment("이름")
    private String memberName;

    @Column(name = "member_birth", nullable = false)
    @Comment("생년월일")
    private LocalDate memberBirth;

    @Column(name = "member_phone", length = 20)
    @Comment("전화번호")
    private String memberPhone;

    @Column(name = "member_email", length = 30)
    @Comment("이메일")
    private String memberEmail;

    @Column(name = "member_nickname", length = 50)
    @Comment("닉네임")
    private String memberNickname;

    @OneToMany(mappedBy = "member", cascade = CascadeType.ALL)
    @Builder.Default
    private List<TeamMember> teamMembers = new ArrayList<>();

    @OneToMany(mappedBy = "member", cascade = CascadeType.ALL)
    @Builder.Default
    private List<Capsule> capsules = new ArrayList<>();
}
