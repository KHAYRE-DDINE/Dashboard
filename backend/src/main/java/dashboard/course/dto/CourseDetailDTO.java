package dashboard.course.dto;

import dashboard.course.Course;
import dashboard.course.Lesson;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.Set;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CourseDetailDTO {
    private Long id;
    private String subject;
    private String title;
    private String description;
    private int progress;
    private int totalHours;
    private String icon;
    private String category;
    private String color;
    private String bgSoft;
    private String textSoft;
    private List<LessonDTO> lessonsList;

    @Data
    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    public static class LessonDTO {
        private Long id;
        private String title;
        private String duration;
        private int orderIndex;
        private String videoUrl;
        private boolean completed;

        public static LessonDTO fromEntity(Lesson lesson, boolean completed) {
            return LessonDTO.builder()
                    .id(lesson.getId())
                    .title(lesson.getTitle())
                    .duration(lesson.getDuration())
                    .orderIndex(lesson.getOrderIndex())
                    .videoUrl(lesson.getVideoUrl())
                    .completed(completed)
                    .build();
        }
    }

    public static CourseDetailDTO fromEntity(Course course, int progress, Set<Long> completedLessonIds) {
        if (course == null) return null;
        List<LessonDTO> lessonDTOs = course.getLessons().stream()
                .map(l -> LessonDTO.fromEntity(l, completedLessonIds != null && completedLessonIds.contains(l.getId())))
                .toList();

        return CourseDetailDTO.builder()
                .id(course.getId())
                .subject(course.getSubject())
                .title(course.getTitle())
                .description(course.getDescription())
                .progress(progress)
                .totalHours(course.getTotalHours())
                .icon(course.getIcon())
                .category(course.getCategory())
                .color(course.getColor())
                .bgSoft(course.getBgSoft())
                .textSoft(course.getTextSoft())
                .lessonsList(lessonDTOs)
                .build();
    }
}
