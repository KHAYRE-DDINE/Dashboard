package dashboard.calendar.dto;

import dashboard.calendar.CalendarEvent;

import java.time.Instant;
import java.time.LocalDate;
import java.util.UUID;

public record CalendarEventDTO (
        UUID id,
        String title,
        String description,
        LocalDate start,
        LocalDate end,
        String color
) {

    public static CalendarEventDTO from(CalendarEvent event) {
        return new CalendarEventDTO(
                event.getId(),
                event.getTitle(),
                event.getDescription(),
                event.getStartDate(),
                event.getEndDate(),
                event.getColor()
        );
    }

}
