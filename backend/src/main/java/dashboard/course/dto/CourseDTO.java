package dashboard.course.dto;

import dashboard.course.Course;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CourseDTO {
    private Long id;
    private String subject;
    private String title;
    private String description;
    private int progress;
    private int totalHours;
    private int lessons;
    private String icon;
    private String category;
    private String color;
    private String bgSoft;
    private String textSoft;
    private String nextAssignment;

    public static CourseDTO fromEntity(Course course, int progress) {
        if (course == null) return null;
        return CourseDTO.builder()
                .id(course.getId())
                .subject(course.getSubject())
                .title(course.getTitle())
                .description(course.getDescription())
                .progress(progress)
                .totalHours(course.getTotalHours())
                .lessons(course.getLessons() != null ? course.getLessons().size() : 0)
                .icon(course.getIcon())
                .category(course.getCategory())
                .color(course.getColor())
                .bgSoft(course.getBgSoft())
                .textSoft(course.getTextSoft())
                .build();
    }
}
