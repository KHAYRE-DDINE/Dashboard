package dashboard.notification;

import dashboard.common.BadRequestException;
import dashboard.common.ResourceNotFoundException;
import dashboard.notification.dto.NotificationDTO;
import dashboard.user.User;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class NotificationService {

    private final NotificationRepository notificationRepository;

    public NotificationService(NotificationRepository notificationRepository) {
        this.notificationRepository = notificationRepository;
    }

    @Transactional(readOnly = true)
    public List<NotificationDTO> getUserNotifications(User user) {
        if (user == null) {
            return notificationRepository.findAll().stream()
                    .map(NotificationDTO::fromEntity)
                    .collect(Collectors.toList());
        }
        return notificationRepository.findByUserIdOrderByCreatedAtDesc(user.getId()).stream()
                .map(NotificationDTO::fromEntity)
                .collect(Collectors.toList());
    }

    public void markAsRead(Long id, User user) {
        Notification notification = notificationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Notification not found with id: " + id));

        if (user != null && !notification.getUser().getId().equals(user.getId())) {
            throw new BadRequestException("Unauthorized to modify this notification");
        }

        notification.setIsRead(true);
        notificationRepository.save(notification);
    }

    public void markAllAsRead(User user) {
        if (user == null) return;
        List<Notification> unread = notificationRepository.findByUserIdAndIsReadFalseOrderByCreatedAtDesc(user.getId());
        unread.forEach(n -> n.setIsRead(true));
        notificationRepository.saveAll(unread);
    }

    public void deleteNotification(Long id, User user) {
        Notification notification = notificationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Notification not found with id: " + id));

        if (user != null && !notification.getUser().getId().equals(user.getId())) {
            throw new BadRequestException("Unauthorized to delete this notification");
        }

        notificationRepository.delete(notification);
    }
}
