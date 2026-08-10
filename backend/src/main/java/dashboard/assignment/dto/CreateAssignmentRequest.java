package dashboard.assignment.dto;

import dashboard.assignment.Assignment;
import dashboard.assignment.AssignmentStatus;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.util.Date;

public record CreateAssignmentRequest(
        @NotBlank String title,
        @NotBlank String image,
        String description,
        @NotBlank String teacherName,
        @NotNull AssignmentStatus status,
        String learningContent,
        @NotNull Date deadline
) {

    public static CreateAssignmentRequest from(Assignment createdAssignment) {
        return new CreateAssignmentRequest(
                createdAssignment.getTitle(),
                createdAssignment.getDescription(),
                createdAssignment.getImage(),
                createdAssignment.getLearningContent(),
                createdAssignment.getStatus(),
                createdAssignment.getTeacherName(),
                createdAssignment.getDeadline()
        );
    }

}
