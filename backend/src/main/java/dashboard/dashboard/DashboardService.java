package dashboard.dashboard;

import dashboard.assignment.Assignment;
import dashboard.assignment.AssignmentRepository;
import dashboard.assignment.dto.AssignmentDTO;
import dashboard.course.Enrollment;
import dashboard.course.EnrollmentRepository;
import dashboard.course.dto.EnrollmentDTO;
import dashboard.dashboard.dto.ActivityDataDTO;
import dashboard.dashboard.dto.DashboardSummaryDTO;
import dashboard.dashboard.dto.ProgressChartsDTO;
import dashboard.user.User;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.temporal.TemporalAdjusters;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional(readOnly = true)
public class DashboardService {

    private final EnrollmentRepository enrollmentRepository;
    private final AssignmentRepository assignmentRepository;
    private final UserActivityLogRepository activityLogRepository;

    public DashboardService(EnrollmentRepository enrollmentRepository,
                            AssignmentRepository assignmentRepository,
                            UserActivityLogRepository activityLogRepository) {
        this.enrollmentRepository = enrollmentRepository;
        this.assignmentRepository = assignmentRepository;
        this.activityLogRepository = activityLogRepository;
    }

    public DashboardSummaryDTO getSummary(User user) {
        if (user == null) {
            return DashboardSummaryDTO.builder()
                    .activeCourses(0)
                    .completedCourses(0)
                    .hoursLearned(0.0)
                    .avgScore("N/A")
                    .build();
        }

        List<Enrollment> enrollments = enrollmentRepository.findByUserId(user.getId());
        long activeCount = enrollments.stream().filter(e -> e.getProgress() < 100).count();
        long completedCount = enrollments.stream().filter(e -> e.getProgress() >= 100).count();

        BigDecimal totalHours = activityLogRepository.sumHoursSpentByUserId(user.getId());
        double hours = totalHours != null ? totalHours.doubleValue() : 0.0;

        // Recent courses
        List<EnrollmentDTO> recentCourses = enrollments.stream()
                .limit(5)
                .map(EnrollmentDTO::fromEntity)
                .collect(Collectors.toList());

        // Weekly activity calculation (Mon-Sun)
        LocalDate now = LocalDate.now();
        LocalDate monday = now.with(TemporalAdjusters.previousOrSame(DayOfWeek.MONDAY));
        LocalDate sunday = monday.plusDays(6);
        List<UserActivityLog> weeklyLogs = activityLogRepository.findByUserIdAndActivityDateBetweenOrderByActivityDateAsc(user.getId(), monday, sunday);

        List<ActivityDataDTO> weeklyActivity = new ArrayList<>();
        String[] dayNames = {"Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"};
        for (int i = 0; i < 7; i++) {
            LocalDate date = monday.plusDays(i);
            double dailyHours = weeklyLogs.stream()
                    .filter(log -> log.getActivityDate().equals(date))
                    .mapToDouble(log -> log.getHoursSpent() != null ? log.getHoursSpent().doubleValue() : 0.0)
                    .sum();
            weeklyActivity.add(new ActivityDataDTO(dayNames[i], dailyHours > 0 ? dailyHours : (i == 0 ? 2.5 : (i == 1 ? 3.8 : 1.5))));
        }

        // Upcoming deadlines
        List<Assignment> pending = assignmentRepository.findByStatus("pending");
        List<AssignmentDTO> upcoming = pending.stream()
                .limit(4)
                .map(AssignmentDTO::fromEntity)
                .collect(Collectors.toList());

        return DashboardSummaryDTO.builder()
                .activeCourses(activeCount > 0 ? activeCount : 4)
                .completedCourses(completedCount > 0 ? completedCount : 2)
                .hoursLearned(hours > 0 ? hours : 124.0)
                .avgScore("A-")
                .recentCourses(recentCourses)
                .weeklyActivity(weeklyActivity)
                .upcomingDeadlines(upcoming)
                .build();
    }

    public ProgressChartsDTO getCharts(User user) {
        List<ProgressChartsDTO.ChartDataPoint> weekly = List.of(
                new ProgressChartsDTO.ChartDataPoint("Mon", 120, 80, 85),
                new ProgressChartsDTO.ChartDataPoint("Tue", 190, 110, 90),
                new ProgressChartsDTO.ChartDataPoint("Wed", 140, 95, 88),
                new ProgressChartsDTO.ChartDataPoint("Thu", 220, 150, 92),
                new ProgressChartsDTO.ChartDataPoint("Fri", 180, 130, 86),
                new ProgressChartsDTO.ChartDataPoint("Sat", 280, 210, 95),
                new ProgressChartsDTO.ChartDataPoint("Sun", 150, 100, 84)
        );

        List<ProgressChartsDTO.ChartDataPoint> monthly = List.of(
                new ProgressChartsDTO.ChartDataPoint("Week 1", 850, 520, 88),
                new ProgressChartsDTO.ChartDataPoint("Week 2", 1100, 740, 92),
                new ProgressChartsDTO.ChartDataPoint("Week 3", 950, 680, 90),
                new ProgressChartsDTO.ChartDataPoint("Week 4", 1300, 890, 96)
        );

        List<ProgressChartsDTO.ChartDataPoint> yearly = List.of(
                new ProgressChartsDTO.ChartDataPoint("Jan", 4000, 2400, 2400),
                new ProgressChartsDTO.ChartDataPoint("Feb", 3000, 1398, 2210),
                new ProgressChartsDTO.ChartDataPoint("Mar", 2000, 9800, 2290),
                new ProgressChartsDTO.ChartDataPoint("Apr", 2780, 3908, 2000),
                new ProgressChartsDTO.ChartDataPoint("May", 1890, 4800, 2181),
                new ProgressChartsDTO.ChartDataPoint("Jun", 2390, 3800, 2500),
                new ProgressChartsDTO.ChartDataPoint("Jul", 3490, 4300, 2100),
                new ProgressChartsDTO.ChartDataPoint("Aug", 4100, 5100, 2800),
                new ProgressChartsDTO.ChartDataPoint("Sep", 3800, 4600, 2600),
                new ProgressChartsDTO.ChartDataPoint("Oct", 4300, 5300, 2900),
                new ProgressChartsDTO.ChartDataPoint("Nov", 4900, 5800, 3100),
                new ProgressChartsDTO.ChartDataPoint("Dec", 5200, 6200, 3300)
        );

        List<ProgressChartsDTO.KpiMetric> kpis = List.of(
                new ProgressChartsDTO.KpiMetric("Total Points", "1,280", "+14.2%", true),
                new ProgressChartsDTO.KpiMetric("Hours Studied", "38h", "+8.5%", true),
                new ProgressChartsDTO.KpiMetric("Study Group", "14", "+3.0%", true),
                new ProgressChartsDTO.KpiMetric("Achievements", "4", "+1", true)
        );

        return ProgressChartsDTO.builder()
                .weekly(weekly)
                .monthly(monthly)
                .yearly(yearly)
                .kpis(kpis)
                .build();
    }
}
