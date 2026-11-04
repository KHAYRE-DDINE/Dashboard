package dashboard.message.dto;

import dashboard.message.Message;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.UUID;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class MessageDTO {
    private Long id;
    private Long conversationId;
    private Long contactId;
    private UUID senderId;
    private String sender; // "me" or "other"
    private String senderName;
    private String avatar;
    private String text;
    private String lastMessage;
    private String time;
    private String attachmentUrl;
    private Instant createdAt;

    private static final DateTimeFormatter TIME_FORMATTER = DateTimeFormatter.ofPattern("hh:mm a").withZone(ZoneId.systemDefault());

    public static MessageDTO fromEntity(Message message, UUID currentUserId) {
        if (message == null) return null;
        boolean isMe = currentUserId != null && message.getSender() != null && currentUserId.equals(message.getSender().getId());
        String timeStr = message.getCreatedAt() != null ? TIME_FORMATTER.format(message.getCreatedAt()) : "Now";

        return MessageDTO.builder()
                .id(message.getId())
                .conversationId(message.getConversation() != null ? message.getConversation().getId() : null)
                .contactId(message.getConversation() != null ? message.getConversation().getId() : null)
                .senderId(message.getSender() != null ? message.getSender().getId() : null)
                .sender(isMe ? "me" : "other")
                .senderName(message.getSenderName())
                .avatar(message.getSenderAvatar())
                .text(message.getText())
                .lastMessage(message.getText())
                .time(timeStr)
                .attachmentUrl(message.getAttachmentUrl())
                .createdAt(message.getCreatedAt())
                .build();
    }
}
