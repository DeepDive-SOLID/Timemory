package solid.backend.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.Comment;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "Capsule")
public class Capsule {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "cap_id")
    @Comment("캡슐 ID")
    private Integer capId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "team_id", nullable = false)
    private Team team;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id", nullable = false)
    private Member member;

    @Column(name = "cap_text", length = 500, nullable = false)
    @Comment("캡슐 내용")
    private String capText;

    @Column(name = "cap_ut", nullable = false)
    @Comment("등록 일자")
    private LocalDateTime capUt;

    @Column(name = "cap_et", nullable = false)
    @Comment("만료 일자")
    private LocalDateTime capEt;

    @Column(name = "cap_img", length = 100)
    @Comment("이미지")
    private String capImg;

    @Column(name = "cap_tag", length = 50)
    @Comment("태그")
    private String capTag;

    @Column(name = "cap_open", nullable = false)
    @Builder.Default
    @Comment("열림 여부")
    private Boolean capOpen = false;

    @OneToOne(mappedBy = "capsule", cascade = CascadeType.ALL)
    private CapsuleLT capsuleLocation;

    @OneToOne(mappedBy = "capsule", cascade = CascadeType.ALL)
    private CapsuleCNDT capsuleCondition;

    @Column(name = "cap_sent", nullable = false)
    @Builder.Default
    @Comment("메시지 발송 여부")
    private Boolean capSent = false;

    @PrePersist
    public void prePersist() {
        this.capUt = LocalDateTime.now();
        if (this.capOpen == null) {
            this.capOpen = false;
        }
        if (this.capSent == null) {
            this.capSent = false;
        }
    }
}
