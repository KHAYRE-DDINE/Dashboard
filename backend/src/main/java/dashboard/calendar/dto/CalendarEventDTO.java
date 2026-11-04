package dashboard.calendar.dto;

import dashboard.calendar.CalendarEvent;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;
import java.util.UUID;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CalendarEventDTO {
    private UUID id;
    private String title;
    private String description;
    private Instant start;
    private Instant end;
    private String color;
    private String eventType;
    private Long referenceId;

    public static CalendarEventDTO from(CalendarEvent event) {
        if (event == null) return null;
        return CalendarEventDTO.builder()
                .id(event.getId())
                .title(event.getTitle())
                .description(event.getDescription())
                .start(event.getStartTime())
                .end(event.getEndTime())
                .color(event.getColor())
                .eventType(event.getEventType())
                .referenceId(event.getReferenceId())
                .build();
    }
}
