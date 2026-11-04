package dashboard.calendar;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.Instant;
import java.util.List;
import java.util.UUID;

@Repository
public interface CalendarEventRepository extends JpaRepository<CalendarEvent, UUID> {
    List<CalendarEvent> findByUserIdOrderByStartTimeAsc(UUID userId);

    @Query("SELECT e FROM CalendarEvent e WHERE e.user.id = :userId AND e.startTime >= :from AND e.endTime <= :to ORDER BY e.startTime ASC")
    List<CalendarEvent> findByUserIdAndRange(UUID userId, Instant from, Instant to);
}
