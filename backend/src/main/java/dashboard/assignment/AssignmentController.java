package dashboard.assignment;

import dashboard.assignment.dto.AssignmentDTO;
import dashboard.assignment.dto.CreateAssignmentRequest;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/assignment")
public class AssignmentController {
    private final AssignmentService assignmentService;

    public AssignmentController(AssignmentService assignmentService) {
        this.assignmentService = assignmentService;
    }

    @GetMapping
    public List<Assignment> getAll() {
        return assignmentService.getAllAssignments();
    }

    @GetMapping("/{status}")
    public List<Assignment> getByStatus(AssignmentStatus status) {
        return assignmentService.getByAssignmentStatus(status);
    }

    @PostMapping("/create")
    public AssignmentDTO createAssignment(@Valid @RequestBody CreateAssignmentRequest assignment) {
        assignmentService.addAssignment(assignment);
        return assignment;
    }

    @PostMapping("/create/user/{userId}")
    public Assignment createAssignmentForUser(@PathVariable UUID userId, @Valid @RequestBody Assignment assignment) {
        return assignmentService.addAssignmentToUser(userId, assignment);
    }

    @PutMapping("/{assignmentID}/update")
    public Assignment updateAssignment(@PathVariable UUID assignmentID, @Valid @RequestBody Assignment updatedAssignment) {
        return assignmentService.updateAssignment(assignmentID, updatedAssignment);
    }
}
