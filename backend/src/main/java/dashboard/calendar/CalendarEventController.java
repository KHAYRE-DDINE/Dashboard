package dashboard.calendar;

import dashboard.calendar.dto.CalendarEventDTO;
import dashboard.calendar.dto.CreateCalendarEventRequest;
import dashboard.calendar.dto.UpdateCalendarEventRequest;
import dashboard.common.ApiResponse;
import dashboard.user.User;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping({"/api/v1/calendar/events", "/calendar/events"})
@Tag(name = "Calendar", description = "Student academic calendar schedule operations")
public class CalendarEventController {

    private final CalendarEventService eventService;

    public CalendarEventController(CalendarEventService eventService) {
        this.eventService = eventService;
    }

    @GetMapping
    @Operation(summary = "Get calendar events for user")
    public List<CalendarEventDTO> getEvents(@AuthenticationPrincipal User user,
                                            @RequestParam(required = false) Instant from,
                                            @RequestParam(required = false) Instant to) {
        return eventService.getEvents(user, from, to);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    @Operation(summary = "Create new calendar event")
    public CalendarEventDTO createEvent(@AuthenticationPrincipal User user,
                                        @Valid @RequestBody CreateCalendarEventRequest request) {
        return eventService.createEvent(user, request);
    }

    @PutMapping("/{id}")
    @Operation(summary = "Update calendar event")
    public CalendarEventDTO updateEvent(@AuthenticationPrincipal User user,
                                        @PathVariable UUID id,
                                        @RequestBody UpdateCalendarEventRequest request) {
        return eventService.updateEvent(user, id, request);
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Delete calendar event")
    public ResponseEntity<ApiResponse<String>> deleteEvent(@AuthenticationPrincipal User user,
                                                           @PathVariable UUID id) {
        eventService.deleteEvent(user, id);
        return ResponseEntity.ok(ApiResponse.success("Event deleted successfully"));
    }
}
