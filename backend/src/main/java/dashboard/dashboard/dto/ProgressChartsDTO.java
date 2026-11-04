package dashboard.dashboard.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ProgressChartsDTO {
    private List<ChartDataPoint> weekly;
    private List<ChartDataPoint> monthly;
    private List<ChartDataPoint> yearly;
    private List<KpiMetric> kpis;

    @Data
    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    public static class ChartDataPoint {
        private String name;
        private double uv;
        private double pv;
        private double amt;
    }

    @Data
    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    public static class KpiMetric {
        private String label;
        private String value;
        private String trend;
        private boolean isPositive;
    }
}
