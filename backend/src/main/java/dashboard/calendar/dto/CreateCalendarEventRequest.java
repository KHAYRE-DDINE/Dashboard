package dashboard.calendar.dto;

import jakarta.validation.constraints.NotBlank;

import java.time.Instant;
import java.time.LocalDate;

public record CreateCalendarEventRequest (
        @NotBlank String title,
        String description,
        @NotBlank LocalDate startDate,
        @NotBlank LocalDate endDate,
        String color
) {

    public static CreateCalendarEventRequest from (CalendarEventDTO  eventReq){
        return new CreateCalendarEventRequest(
                eventReq.title(),
                eventReq.description(),
                eventReq.start(),
                eventReq.end(),
                eventReq.color()
        );
    }
}
