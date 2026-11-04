package dashboard.calendar;

import dashboard.user.User;
import jakarta.persistence.*;
import lombok.*;

import java.time.Instant;
import java.util.UUID;

@Entity
@Table(name = "calendar_events")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CalendarEvent {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(nullable = false)
    private String title;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(name = "start_time", nullable = false)
    private Instant startTime;

    @Column(name = "end_time", nullable = false)
    private Instant endTime;

    @Builder.Default
    @Column(length = 50)
    private String color = "#4F46E5";

    @Builder.Default
    @Column(name = "event_type", length = 50)
    private String eventType = "custom";

    @Column(name = "reference_id")
    private Long referenceId;

    @Builder.Default
    @Column(name = "created_at")
    private Instant createdAt = Instant.now();
}
