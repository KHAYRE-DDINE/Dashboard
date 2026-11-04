package dashboard.message.dto;

import dashboard.message.Conversation;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ConversationDTO {
    private Long id;
    private String name;
    private String avatar;
    private String lastMsg;
    private String time;
    private int unread;
    private boolean online;

    public static ConversationDTO fromEntity(Conversation conversation, UUID currentUserId) {
        if (conversation == null) return null;
        return ConversationDTO.builder()
                .id(conversation.getId())
                .name(conversation.getTitle() != null ? conversation.getTitle() : "Conversation " + conversation.getId())
                .lastMsg("")
                .time("Now")
                .unread(0)
                .online(true)
                .build();
    }
}
