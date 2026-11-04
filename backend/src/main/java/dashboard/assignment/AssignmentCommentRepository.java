package dashboard.assignment;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AssignmentCommentRepository extends JpaRepository<AssignmentComment, Long> {
    List<AssignmentComment> findByAssignmentIdOrderByCreatedAtDesc(Long assignmentId);
}
