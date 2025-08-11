package solid.backend.entity;

import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "CapsuleCNDT")
public class CapsuleCNDT {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "cap_cndt_id")
    private Integer capCndtId;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "cap_id", nullable = false)
    private Capsule capsule;

    @Column(name = "cap_cndt_case", length = 100, nullable = false)
    private String capCndtCase;
}
