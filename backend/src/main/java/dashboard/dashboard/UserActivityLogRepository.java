package dashboard.dashboard;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@Repository
public interface UserActivityLogRepository extends JpaRepository<UserActivityLog, Long> {

    List<UserActivityLog> findByUserIdAndActivityDateBetweenOrderByActivityDateAsc(UUID userId, LocalDate start, LocalDate end);

    @Query("SELECT COALESCE(SUM(l.hoursSpent), 0) FROM UserActivityLog l WHERE l.user.id = :userId")
    BigDecimal sumHoursSpentByUserId(UUID userId);
}
