package dashboard.assignment;

import dashboard.assignment.dto.CreateAssignmentRequest;
import dashboard.user.User;
import dashboard.user.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class AssignmentService {

    private final AssignmentRepository assignmentRepository;
    private final UserRepository userRepository;

    public AssignmentService(AssignmentRepository assignmentRepository, UserRepository userRepository) {
        this.assignmentRepository = assignmentRepository;
        this.userRepository = userRepository;
    }

    public List<Assignment> getAllAssignments() {
        return assignmentRepository.findAll();
    }

    public List<Assignment> getByAssignmentStatus(AssignmentStatus status) {
        return assignmentRepository.findAssignmentsByStatus(status);
    }

    public ResponseEntity<Assignment> addAssignment(Assignment assignment) {
        return ResponseEntity.ok(assignmentRepository.save(assignment));
    }

    public Assignment addAssignmentToUser(UUID id, Assignment assignment) {
        User user = userRepository.findById(id).orElseThrow(() -> new RuntimeException("User Not Found"));

        assignment.setUser(user);

        return assignmentRepository.save(assignment);
    }

    public Assignment updateAssignment(UUID assignmentID, Assignment updatedAssignment) {
        Assignment assignment = assignmentRepository.findAssignmentsById(assignmentID);

        assignment.setUser(updatedAssignment.getUser());
        assignment.setDeadline(updatedAssignment.getDeadline());
        assignment.setImage(updatedAssignment.getImage());
        assignment.setDescription(updatedAssignment.getDescription());
        assignment.setLearningContent(updatedAssignment.getLearningContent());
        assignment.setStatus(updatedAssignment.getStatus());
        assignment.setTeacherName(updatedAssignment.getTeacherName());
        assignment.setTitle(updatedAssignment.getTitle());

        return assignmentRepository.save(assignment);
    }
}
