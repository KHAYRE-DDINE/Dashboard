package dashboard.assignment;

import dashboard.assignment.dto.ResourceDTO;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping({"/api/v1/resources", "/resources"})
@Tag(name = "Resources", description = "Global learning resources endpoint")
public class ResourceController {

    private final AssignmentService assignmentService;

    public ResourceController(AssignmentService assignmentService) {
        this.assignmentService = assignmentService;
    }

    @GetMapping
    @Operation(summary = "Get all learning resources")
    public List<ResourceDTO> getAllResources() {
        return assignmentService.getAllResources();
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    @Operation(summary = "Upload or add learning resource")
    public ResourceDTO addResource(@RequestBody ResourceDTO resourceDTO) {
        return assignmentService.addResource(resourceDTO.getAssignmentId(), resourceDTO);
    }
}
