package solid.backend.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.Comment;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "Team")
public class Team {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "team_id")
    @Comment("팀 ID")
    private Long teamId;

    @Column(name = "team_name", length = 100, nullable = false)
    @Comment("팀 이름")
    private String teamName;

    @OneToMany(mappedBy = "team", cascade = CascadeType.ALL)
    @Builder.Default
    private List<TeamMember> teamMembers = new ArrayList<>();

    @OneToMany(mappedBy = "team", cascade = CascadeType.ALL)
    @Builder.Default
    private List<Capsule> capsules = new ArrayList<>();
}
