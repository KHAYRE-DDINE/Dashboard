package dashboard.assignment.dto;

import dashboard.assignment.Assignment;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AssignmentDTO {
    private Long id;
    private String title;
    private String subject;
    private String description;
    private String status;
    private String date;
    private String time;
    private String color;
    private String teacher;

    public static AssignmentDTO fromEntity(Assignment assignment) {
        if (assignment == null) return null;
        return AssignmentDTO.builder()
                .id(assignment.getId())
                .title(assignment.getTitle())
                .subject(assignment.getSubject())
                .description(assignment.getDescription())
                .status(assignment.getStatus())
                .date(assignment.getDueDate())
                .time(assignment.getDueTime())
                .color(assignment.getColor())
                .teacher(assignment.getTeacher())
                .build();
    }
}
