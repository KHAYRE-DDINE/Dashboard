package dashboard.assignment.dto;

import dashboard.assignment.AssignmentComment;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CommentDTO {
    private Long id;
    private Long assignmentId;
    private String name;
    private String avatar;
    private String text;
    private Instant createdAt;

    public static CommentDTO fromEntity(AssignmentComment comment) {
        if (comment == null) return null;
        return CommentDTO.builder()
                .id(comment.getId())
                .assignmentId(comment.getAssignment() != null ? comment.getAssignment().getId() : null)
                .name(comment.getAuthorName())
                .avatar(comment.getAuthorAvatar())
                .text(comment.getText())
                .createdAt(comment.getCreatedAt())
                .build();
    }
}
