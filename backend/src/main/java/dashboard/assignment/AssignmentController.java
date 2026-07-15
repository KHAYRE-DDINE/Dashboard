package dashboard.assignment;

import dashboard.assignment.dto.CreateAssignmentRequest;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/assignment")
public class AssignmentController {
    private final AssignmentService assignmentService;

    public AssignmentController (AssignmentService assignmentService){
        this.assignmentService = assignmentService;
    }

    @GetMapping
    public List<Assignment> getAll(){
        return assignmentService.getAllAssignments();
    }

    @GetMapping("{status}")
    public List<Assignment> getByStatus(AssignmentStatus status){
        return  assignmentService.getByAssignmentStatus(status);
    }

    @PostMapping("create")
    public Assignment createAssignment(@Valid @RequestBody Assignment assignment) {
        assignmentService.addAssignment(assignment);
        return assignment;
    }
}
