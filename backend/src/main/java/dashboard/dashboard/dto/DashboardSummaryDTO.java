package dashboard.dashboard.dto;

import dashboard.assignment.dto.AssignmentDTO;
import dashboard.course.dto.EnrollmentDTO;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class DashboardSummaryDTO {
    private long activeCourses;
    private long completedCourses;
    private double hoursLearned;
    private String avgScore;
    @Builder.Default
    private List<EnrollmentDTO> recentCourses = new ArrayList<>();
    @Builder.Default
    private List<ActivityDataDTO> weeklyActivity = new ArrayList<>();
    @Builder.Default
    private List<AssignmentDTO> upcomingDeadlines = new ArrayList<>();
}
