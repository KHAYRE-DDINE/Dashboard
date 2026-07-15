package dashboard.calendar.dto;

import jakarta.validation.constraints.NotBlank;

import java.time.LocalDate;

public record UpdateCalendarEventRequest (
        String title,
        String description,
        LocalDate startDate,
        LocalDate endDate,
        String color
) {
    public static UpdateCalendarEventRequest from (CalendarEventDTO  eventReq){
        return new UpdateCalendarEventRequest(
                eventReq.title(),
                eventReq.description(),
                eventReq.start(),
                eventReq.end(),
                eventReq.color()
        );
    }
}
