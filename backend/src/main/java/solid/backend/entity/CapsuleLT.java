package solid.backend.entity;

import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "CapsuleLT")
public class CapsuleLT {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "cap_lt_id")
    private Integer capLtId;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "cap_id", nullable = false)
    private Capsule capsule;

    @Column(name = "cap_lt_addr", length = 50, nullable = false)
    private String capLtAddr;

    @Column(name = "cap_lt_detail", length = 50, nullable = false)
    private String capLtDetail;
}
