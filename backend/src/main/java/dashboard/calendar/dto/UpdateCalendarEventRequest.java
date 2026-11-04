package dashboard.calendar.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UpdateCalendarEventRequest {
    private String title;
    private String description;
    private Instant start;
    private Instant end;
    private String color;
    private String eventType;
}
