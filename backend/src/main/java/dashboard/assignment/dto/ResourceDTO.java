package dashboard.assignment.dto;

import dashboard.assignment.AssignmentResource;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ResourceDTO {
    private Long id;
    private Long assignmentId;
    private String title;
    private String subject;
    private String type;
    private String size;
    private String url;
    private String description;
    private String image;
    private Instant createdAt;

    public static ResourceDTO fromEntity(AssignmentResource resource) {
        if (resource == null) return null;
        return ResourceDTO.builder()
                .id(resource.getId())
                .assignmentId(resource.getAssignment() != null ? resource.getAssignment().getId() : null)
                .title(resource.getTitle())
                .subject(resource.getSubject())
                .type(resource.getType())
                .size(resource.getSize())
                .url(resource.getUrl())
                .description(resource.getDescription())
                .image(resource.getImageUrl())
                .createdAt(resource.getCreatedAt())
                .build();
    }
}
