package dashboard.assignment;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface SubmissionRepository extends JpaRepository<Submission, Long> {
    List<Submission> findByUserId(UUID userId);
    Optional<Submission> findByAssignmentIdAndUserId(Long assignmentId, UUID userId);
}
