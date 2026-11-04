package dashboard.message;

import dashboard.message.dto.ConversationDTO;
import dashboard.message.dto.MessageDTO;
import dashboard.message.dto.SendMessageRequest;
import dashboard.user.User;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping({"/api/v1/messages", "/messages"})
@Tag(name = "Messages", description = "Direct messaging and conversation channels")
public class MessageController {

    private final MessageService messageService;

    public MessageController(MessageService messageService) {
        this.messageService = messageService;
    }

    @GetMapping
    @Operation(summary = "Get messages or list user messages")
    public List<MessageDTO> getAllMessages(@RequestParam(value = "conversationId", required = false) Long conversationId,
                                           @AuthenticationPrincipal User currentUser) {
        if (conversationId != null) {
            return messageService.getMessagesForConversation(conversationId, currentUser);
        }
        return messageService.getAllMessages(currentUser);
    }

    @GetMapping("/conversations")
    @Operation(summary = "Get user conversation list")
    public List<ConversationDTO> getConversations(@AuthenticationPrincipal User currentUser) {
        return messageService.getConversations(currentUser);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    @Operation(summary = "Send a new message")
    public MessageDTO sendMessage(@RequestBody SendMessageRequest request,
                                  @AuthenticationPrincipal User currentUser) {
        return messageService.sendMessage(request, currentUser);
    }
}
