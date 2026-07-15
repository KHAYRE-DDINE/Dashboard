package dashboard.assignment;

import dashboard.user.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.hibernate.validator.constraints.Length;

import java.time.Instant;
import java.util.UUID;

@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "submission")

public class Submission {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    @JoinColumn(name = "assignment_id")
    private String assignment;

    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    private User student;

    private String fileUrl;

    @Column(length = 4000)
    private String content;

    @Column(length = 2000)
    private String feedback;

    private Integer grade;

    @Column(nullable = false)
    private Instant submittedAt;

    @PrePersist
    void onCreate() {
        submittedAt = Instant.now();
    }

}
