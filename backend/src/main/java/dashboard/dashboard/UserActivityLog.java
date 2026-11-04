package dashboard.dashboard;

import dashboard.user.User;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.Instant;
import java.time.LocalDate;

@Entity
@Table(name = "user_activity_logs")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserActivityLog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(name = "activity_type", nullable = false, length = 50)
    private String activityType;

    @Column(name = "hours_spent", precision = 5, scale = 2)
    @Builder.Default
    private BigDecimal hoursSpent = BigDecimal.ZERO;

    @Column(name = "activity_date", nullable = false)
    @Builder.Default
    private LocalDate activityDate = LocalDate.now();

    @Column(name = "created_at")
    @Builder.Default
    private Instant createdAt = Instant.now();
}
