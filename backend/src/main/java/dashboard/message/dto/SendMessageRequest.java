package dashboard.message.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class SendMessageRequest {
    private Long id;
    private Long contactId;
    private Long conversationId;
    private String text;
    private String lastMessage;
    private String sender;
    private String time;
    private String attachmentUrl;
    private String attachmentType;
}
