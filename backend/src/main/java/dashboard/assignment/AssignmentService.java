package dashboard.assignment;

import dashboard.assignment.dto.CreateAssignmentRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;
import java.util.UUID;

@Service
public class AssignmentService {

    private final AssignmentRepository assignmentRepository;

    public AssignmentService ( AssignmentRepository assignmentRepository ) {
        this.assignmentRepository =  assignmentRepository;
    }

    public List<Assignment> getAllAssignments(){
        return assignmentRepository.findAll();
    }

    public List<Assignment> getByAssignmentStatus(AssignmentStatus status){
        return  assignmentRepository.findAssignmentsByStatus(status);
    }

    public ResponseEntity<Assignment> addAssignment(Assignment assignment){
        return ResponseEntity.ok(assignmentRepository.save(assignment));
    }
}
