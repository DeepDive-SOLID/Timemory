package solid.backend.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.*;

import java.io.Serializable;

@Embeddable
@Data
@NoArgsConstructor
@AllArgsConstructor
public class TeamMemberId implements Serializable {
    @Column(name = "team_id")
    private Integer teamId;

    @Column(name = "member_id")
    private String memberId;
}
