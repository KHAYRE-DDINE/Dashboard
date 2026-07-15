package dashboard.assignment.dto;

import dashboard.assignment.Assignment;
import dashboard.assignment.AssignmentStatus;
import jakarta.validation.constraints.NotBlank;

import java.util.Date;

public record UpdateAssignmentRequest(
        String title,
        String image,
        String description,
        String teacherName,
        AssignmentStatus status,
        String learningContent,
        Date deadline
) {

    public static UpdateAssignmentRequest from(Assignment updatedAssignment){
        return new UpdateAssignmentRequest(
                updatedAssignment.getTitle(),
                updatedAssignment.getDescription(),
                updatedAssignment.getImages(),
                updatedAssignment.getLearningContent(),
                updatedAssignment.getStatus(),
                updatedAssignment.getTeacherName(),
                updatedAssignment.getDeadline()
        );
    }

}
