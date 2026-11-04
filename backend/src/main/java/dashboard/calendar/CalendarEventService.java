package dashboard.calendar;

import dashboard.calendar.dto.CalendarEventDTO;
import dashboard.calendar.dto.CreateCalendarEventRequest;
import dashboard.calendar.dto.UpdateCalendarEventRequest;
import dashboard.common.BadRequestException;
import dashboard.common.ResourceNotFoundException;
import dashboard.user.User;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@Transactional
public class CalendarEventService {

    private final CalendarEventRepository eventRepository;

    public CalendarEventService(CalendarEventRepository eventRepository) {
        this.eventRepository = eventRepository;
    }

    @Transactional(readOnly = true)
    public List<CalendarEventDTO> getEvents(User user, Instant from, Instant to) {
        if (user == null) {
            return List.of();
        }
        List<CalendarEvent> events;
        if (from != null && to != null) {
            events = eventRepository.findByUserIdAndRange(user.getId(), from, to);
        } else {
            events = eventRepository.findByUserIdOrderByStartTimeAsc(user.getId());
        }
        return events.stream().map(CalendarEventDTO::from).collect(Collectors.toList());
    }

    public CalendarEventDTO createEvent(User user, CreateCalendarEventRequest request) {
        if (user == null) {
            throw new BadRequestException("User must be authenticated to create events");
        }

        CalendarEvent event = CalendarEvent.builder()
                .user(user)
                .title(request.getTitle())
                .description(request.getDescription())
                .startTime(request.getStart())
                .endTime(request.getEnd())
                .color(request.getColor() != null ? request.getColor() : "#4F46E5")
                .eventType(request.getEventType() != null ? request.getEventType() : "custom")
                .referenceId(request.getReferenceId())
                .createdAt(Instant.now())
                .build();

        CalendarEvent saved = eventRepository.save(event);
        return CalendarEventDTO.from(saved);
    }

    public CalendarEventDTO updateEvent(User user, UUID eventId, UpdateCalendarEventRequest request) {
        CalendarEvent event = eventRepository.findById(eventId)
                .orElseThrow(() -> new ResourceNotFoundException("Calendar event not found with id: " + eventId));

        if (!event.getUser().getId().equals(user.getId())) {
            throw new BadRequestException("Unauthorized to modify this event");
        }

        if (request.getTitle() != null) event.setTitle(request.getTitle());
        if (request.getDescription() != null) event.setDescription(request.getDescription());
        if (request.getStart() != null) event.setStartTime(request.getStart());
        if (request.getEnd() != null) event.setEndTime(request.getEnd());
        if (request.getColor() != null) event.setColor(request.getColor());
        if (request.getEventType() != null) event.setEventType(request.getEventType());

        CalendarEvent updated = eventRepository.save(event);
        return CalendarEventDTO.from(updated);
    }

    public void deleteEvent(User user, UUID eventId) {
        CalendarEvent event = eventRepository.findById(eventId)
                .orElseThrow(() -> new ResourceNotFoundException("Calendar event not found with id: " + eventId));

        if (!event.getUser().getId().equals(user.getId())) {
            throw new BadRequestException("Unauthorized to delete this event");
        }

        eventRepository.delete(event);
    }
}
