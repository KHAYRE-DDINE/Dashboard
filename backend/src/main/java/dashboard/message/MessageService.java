package dashboard.message;

import dashboard.common.BadRequestException;
import dashboard.message.dto.ConversationDTO;
import dashboard.message.dto.MessageDTO;
import dashboard.message.dto.SendMessageRequest;
import dashboard.user.User;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@Transactional
public class MessageService {

    private final ConversationRepository conversationRepository;
    private final ConversationParticipantRepository participantRepository;
    private final MessageRepository messageRepository;

    public MessageService(ConversationRepository conversationRepository,
                          ConversationParticipantRepository participantRepository,
                          MessageRepository messageRepository) {
        this.conversationRepository = conversationRepository;
        this.participantRepository = participantRepository;
        this.messageRepository = messageRepository;
    }

    @Transactional(readOnly = true)
    public List<MessageDTO> getAllMessages(User currentUser) {
        UUID userId = currentUser != null ? currentUser.getId() : null;
        return messageRepository.findAll().stream()
                .map(m -> MessageDTO.fromEntity(m, userId))
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<MessageDTO> getMessagesForConversation(Long conversationId, User currentUser) {
        UUID userId = currentUser != null ? currentUser.getId() : null;
        return messageRepository.findByConversationIdOrderByCreatedAtAsc(conversationId).stream()
                .map(m -> MessageDTO.fromEntity(m, userId))
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<ConversationDTO> getConversations(User currentUser) {
        if (currentUser == null) return List.of();
        return conversationRepository.findConversationsByUserId(currentUser.getId()).stream()
                .map(c -> ConversationDTO.fromEntity(c, currentUser.getId()))
                .collect(Collectors.toList());
    }

    public MessageDTO sendMessage(SendMessageRequest request, User currentUser) {
        if (currentUser == null) {
            throw new BadRequestException("Must be authenticated to send messages");
        }

        Long targetConvId = request.getConversationId();
        if (targetConvId == null) {
            targetConvId = request.getContactId();
        }
        if (targetConvId == null) {
            targetConvId = 1L; // default channel
        }

        final Long finalTargetConvId = targetConvId;
        Conversation conversation = conversationRepository.findById(finalTargetConvId)
                .orElseGet(() -> {
                    Conversation newConv = Conversation.builder()
                            .title("Direct Message")
                            .isGroup(false)
                            .createdAt(Instant.now())
                            .updatedAt(Instant.now())
                            .build();
                    Conversation savedConv = conversationRepository.save(newConv);

                    ConversationParticipant part = ConversationParticipant.builder()
                            .conversation(savedConv)
                            .user(currentUser)
                            .lastReadAt(Instant.now())
                            .build();
                    participantRepository.save(part);
                    return savedConv;
                });

        String text = request.getText();
        if (text == null || text.isBlank()) {
            text = request.getLastMessage();
        }
        if (text == null || text.isBlank()) {
            text = "";
        }

        Message message = Message.builder()
                .conversation(conversation)
                .sender(currentUser)
                .senderName(currentUser.getFirstName() + " " + currentUser.getLastName())
                .senderAvatar(currentUser.getAvatar())
                .text(text)
                .attachmentUrl(request.getAttachmentUrl())
                .attachmentType(request.getAttachmentType())
                .isRead(false)
                .createdAt(Instant.now())
                .build();

        Message saved = messageRepository.save(message);

        conversation.setUpdatedAt(Instant.now());
        conversationRepository.save(conversation);

        return MessageDTO.fromEntity(saved, currentUser.getId());
    }
}
