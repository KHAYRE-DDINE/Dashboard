package dashboard.notification.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import dashboard.notification.Notification;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Duration;
import java.time.Instant;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class NotificationDTO {
    private Long id;
    private String title;
    private String body;
    private String message;
    private String icon;
    private String iconBg;
    private String iconColor;
    private boolean read;
    private String link;
    private String time;
    private Instant createdAt;

    public static NotificationDTO fromEntity(Notification notification) {
        if (notification == null) return null;
        String timeAgo = formatTimeAgo(notification.getCreatedAt());

        return NotificationDTO.builder()
                .id(notification.getId())
                .title(notification.getTitle())
                .body(notification.getBody())
                .message(notification.getBody())
                .icon(notification.getIcon())
                .iconBg(notification.getIconBg())
                .iconColor(notification.getIconColor())
                .read(Boolean.TRUE.equals(notification.getIsRead()))
                .link(notification.getLink())
                .time(timeAgo)
                .createdAt(notification.getCreatedAt())
                .build();
    }

    private static String formatTimeAgo(Instant instant) {
        if (instant == null) return "Just now";
        Duration duration = Duration.between(instant, Instant.now());
        long seconds = duration.getSeconds();
        if (seconds < 60) return "Just now";
        if (seconds < 3600) return (seconds / 60) + "m ago";
        if (seconds < 86400) return (seconds / 3600) + "h ago";
        return (seconds / 86400) + "d ago";
    }
}
