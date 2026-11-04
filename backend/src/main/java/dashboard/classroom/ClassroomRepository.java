package dashboard.classroom;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface ClassroomRepository extends JpaRepository<Classroom, Long> {
    Optional<Classroom> findByJoinCode(String joinCode);

    @Query("SELECT c FROM Classroom c JOIN c.memberships m WHERE m.user.id = :userId")
    List<Classroom> findClassesByUserId(UUID userId);

    @Query("SELECT c FROM Classroom c WHERE LOWER(c.title) LIKE LOWER(CONCAT('%', :query, '%')) OR LOWER(c.subject) LIKE LOWER(CONCAT('%', :query, '%'))")
    List<Classroom> searchClasses(String query);
}
