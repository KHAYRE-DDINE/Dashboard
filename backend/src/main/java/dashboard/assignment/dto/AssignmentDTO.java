package dashboard.assignment.dto;

import dashboard.assignment.Assignment;
import dashboard.assignment.AssignmentStatus;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.util.Date;

public record AssignmentDTO(
        @NotBlank String title,
        @NotBlank String image,
        String description,
        @NotBlank String teacherName,
        @NotNull AssignmentStatus status,
        String learningContent,
        @NotNull Date deadline
) {

    public static AssignmentDTO from(Assignment assignmentDto) {
        return new AssignmentDTO(
                assignmentDto.getTitle(),
                assignmentDto.getImage(),
                assignmentDto.getDescription(),
                assignmentDto.getTeacherName(),
                assignmentDto.getStatus(),
                assignmentDto.getLearningContent(),
                assignmentDto.getDeadline()
        );
    }
}
