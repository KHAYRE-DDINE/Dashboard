package dashboard.notification;

import dashboard.common.ApiResponse;
import dashboard.notification.dto.NotificationDTO;
import dashboard.user.User;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping({"/api/v1/notifications", "/notifications"})
@Tag(name = "Notifications", description = "Student notifications, alerts, and achievements")
public class NotificationController {

    private final NotificationService notificationService;

    public NotificationController(NotificationService notificationService) {
        this.notificationService = notificationService;
    }

    @GetMapping
    @Operation(summary = "Get user notifications")
    public List<NotificationDTO> getNotifications(@AuthenticationPrincipal User user) {
        return notificationService.getUserNotifications(user);
    }

    @PatchMapping("/{id}/read")
    @Operation(summary = "Mark notification as read")
    public ResponseEntity<ApiResponse<String>> markAsRead(@PathVariable Long id,
                                                          @AuthenticationPrincipal User user) {
        notificationService.markAsRead(id, user);
        return ResponseEntity.ok(ApiResponse.success("Notification marked as read"));
    }

    @PatchMapping("/read-all")
    @Operation(summary = "Mark all notifications as read")
    public ResponseEntity<ApiResponse<String>> markAllAsRead(@AuthenticationPrincipal User user) {
        notificationService.markAllAsRead(user);
        return ResponseEntity.ok(ApiResponse.success("All notifications marked as read"));
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Dismiss or delete notification")
    public ResponseEntity<ApiResponse<String>> deleteNotification(@PathVariable Long id,
                                                                  @AuthenticationPrincipal User user) {
        notificationService.deleteNotification(id, user);
        return ResponseEntity.ok(ApiResponse.success("Notification dismissed"));
    }
}
