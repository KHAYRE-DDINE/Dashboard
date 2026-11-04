package dashboard.course.dto;

import dashboard.course.Enrollment;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class EnrollmentDTO {
    private Long id;
    private Long courseId;
    private String courseTitle;
    private String subject;
    private int progress;
    private String grade;
    private boolean isArchived;
    private Instant completedAt;

    public static EnrollmentDTO fromEntity(Enrollment enrollment) {
        if (enrollment == null) return null;
        return EnrollmentDTO.builder()
                .id(enrollment.getId())
                .courseId(enrollment.getCourse().getId())
                .courseTitle(enrollment.getCourse().getTitle())
                .subject(enrollment.getCourse().getSubject())
                .progress(enrollment.getProgress())
                .grade(enrollment.getGrade())
                .isArchived(enrollment.isArchived())
                .completedAt(enrollment.getCompletedAt())
                .build();
    }
}
