package dashboard.classroom;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface ClassMembershipRepository extends JpaRepository<ClassMembership, Long> {
    Optional<ClassMembership> findByClassroomIdAndUserId(Long classroomId, UUID userId);
    List<ClassMembership> findByUserId(UUID userId);
    boolean existsByClassroomIdAndUserId(Long classroomId, UUID userId);
}
