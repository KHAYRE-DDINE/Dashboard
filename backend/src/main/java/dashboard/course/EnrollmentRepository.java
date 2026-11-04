package dashboard.course;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface EnrollmentRepository extends JpaRepository<Enrollment, Long> {
    List<Enrollment> findByUserId(UUID userId);
    List<Enrollment> findByUserIdAndIsArchivedFalse(UUID userId);
    List<Enrollment> findByUserIdAndIsArchivedTrue(UUID userId);
    Optional<Enrollment> findByUserIdAndCourseId(UUID userId, Long courseId);

    @Query("SELECT COUNT(e) FROM Enrollment e WHERE e.user.id = :userId AND e.progress = 100")
    long countCompletedCoursesByUser(UUID userId);

    @Query("SELECT COUNT(e) FROM Enrollment e WHERE e.user.id = :userId AND e.progress < 100 AND e.isArchived = false")
    long countActiveCoursesByUser(UUID userId);
}
