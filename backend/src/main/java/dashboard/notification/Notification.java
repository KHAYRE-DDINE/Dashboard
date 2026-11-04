package dashboard.notification;

import dashboard.user.User;
import jakarta.persistence.*;
import lombok.*;

import java.time.Instant;

@Entity
@Table(name = "notifications")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Notification {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(nullable = false)
    private String title;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String body;

    @Builder.Default
    @Column(length = 50)
    private String icon = "bell";

    @Builder.Default
    @Column(name = "icon_bg", length = 50)
    private String iconBg = "bg-blue-100";

    @Builder.Default
    @Column(name = "icon_color", length = 50)
    private String iconColor = "text-blue-600";

    @Builder.Default
    @Column(name = "is_read")
    private Boolean isRead = false;

    private String link;

    @Builder.Default
    @Column(name = "created_at")
    private Instant createdAt = Instant.now();
}
