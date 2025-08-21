package solid.backend.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "Anniversary")
public class Anniversary {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ann_id")
    private Integer annId;

    @Column(name = "ann_name", length = 20, nullable = false)
    private String annName;

    @Column(name = "ann_dt", nullable = false)
    private LocalDate annDt;
}
