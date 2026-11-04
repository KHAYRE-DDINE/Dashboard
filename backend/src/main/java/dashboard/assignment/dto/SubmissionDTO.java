package dashboard.assignment.dto;

import dashboard.assignment.Submission;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;
import java.util.UUID;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class SubmissionDTO {
    private Long id;
    private Long assignmentId;
    private UUID userId;
    private String studentName;
    private String content;
    private String fileUrl;
    private String grade;
    private String feedback;
    private String status;
    private Instant submittedAt;

    public static SubmissionDTO fromEntity(Submission submission) {
        if (submission == null) return null;
        return SubmissionDTO.builder()
                .id(submission.getId())
                .assignmentId(submission.getAssignment() != null ? submission.getAssignment().getId() : null)
                .userId(submission.getUser() != null ? submission.getUser().getId() : null)
                .studentName(submission.getUser() != null ? submission.getUser().getFirstName() + " " + submission.getUser().getLastName() : null)
                .content(submission.getContent())
                .fileUrl(submission.getFileUrl())
                .grade(submission.getGrade())
                .feedback(submission.getFeedback())
                .status(submission.getStatus())
                .submittedAt(submission.getSubmittedAt())
                .build();
    }
}
