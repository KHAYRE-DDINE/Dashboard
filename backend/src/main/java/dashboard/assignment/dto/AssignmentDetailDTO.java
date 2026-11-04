package dashboard.assignment.dto;

import dashboard.assignment.Assignment;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AssignmentDetailDTO {
    private Long id;
    private String title;
    private String subject;
    private String description;
    private String status;
    private String date;
    private String time;
    private String color;
    private String teacher;
    private SubmissionDTO submission;
    @Builder.Default
    private List<CommentDTO> comments = new ArrayList<>();
    @Builder.Default
    private List<ResourceDTO> resources = new ArrayList<>();

    public static AssignmentDetailDTO fromEntity(Assignment assignment) {
        if (assignment == null) return null;
        return AssignmentDetailDTO.builder()
                .id(assignment.getId())
                .title(assignment.getTitle())
                .subject(assignment.getSubject())
                .description(assignment.getDescription())
                .status(assignment.getStatus())
                .date(assignment.getDueDate())
                .time(assignment.getDueTime())
                .color(assignment.getColor())
                .teacher(assignment.getTeacher())
                .comments(assignment.getComments() != null ?
                        assignment.getComments().stream().map(CommentDTO::fromEntity).collect(Collectors.toList()) : new ArrayList<>())
                .resources(assignment.getResources() != null ?
                        assignment.getResources().stream().map(ResourceDTO::fromEntity).collect(Collectors.toList()) : new ArrayList<>())
                .build();
    }
}
