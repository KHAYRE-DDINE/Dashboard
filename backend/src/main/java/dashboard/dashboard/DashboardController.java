package dashboard.dashboard;

import dashboard.dashboard.dto.DashboardSummaryDTO;
import dashboard.dashboard.dto.ProgressChartsDTO;
import dashboard.user.User;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping({"/api/v1/dashboard", "/dashboard"})
@Tag(name = "Dashboard", description = "Student dashboard summaries and analytics charts")
public class DashboardController {

    private final DashboardService dashboardService;

    public DashboardController(DashboardService dashboardService) {
        this.dashboardService = dashboardService;
    }

    @GetMapping("/summary")
    @Operation(summary = "Get aggregated summary for student dashboard home")
    public DashboardSummaryDTO getSummary(@AuthenticationPrincipal User currentUser) {
        return dashboardService.getSummary(currentUser);
    }

    @GetMapping("/charts")
    @Operation(summary = "Get analytics charts datasets (weekly, monthly, yearly)")
    public ProgressChartsDTO getCharts(@AuthenticationPrincipal User currentUser) {
        return dashboardService.getCharts(currentUser);
    }
}
