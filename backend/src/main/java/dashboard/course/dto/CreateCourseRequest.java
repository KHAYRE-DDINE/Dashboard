package dashboard.course.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CreateCourseRequest {
    @NotBlank(message = "Course title is required")
    private String title;

    @NotBlank(message = "Course subject is required")
    private String subject;

    private String description;
    private int totalHours;
    private String icon;
    private String color;
}
