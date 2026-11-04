package dashboard.assignment;

import dashboard.assignment.dto.*;
import dashboard.common.ApiResponse;
import dashboard.user.User;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping({"/api/v1/assignments", "/assignments"})
@Tag(name = "Assignments", description = "Assignment management, comments, and submissions")
public class AssignmentController {

    private final AssignmentService assignmentService;

    public AssignmentController(AssignmentService assignmentService) {
        this.assignmentService = assignmentService;
    }

    @GetMapping
    @Operation(summary = "Get all assignments")
    public List<AssignmentDTO> getAll(@RequestParam(value = "status", required = false) String status) {
        return assignmentService.getAllAssignments(status);
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get assignment details")
    public AssignmentDetailDTO getById(@PathVariable Long id, @AuthenticationPrincipal User currentUser) {
        return assignmentService.getAssignmentById(id, currentUser);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    @Operation(summary = "Create assignment")
    public AssignmentDTO createAssignment(@Valid @RequestBody CreateAssignmentRequest request,
                                          @AuthenticationPrincipal User currentUser) {
        return assignmentService.createAssignment(request, currentUser);
    }

    @PutMapping("/{id}")
    @Operation(summary = "Update assignment")
    public AssignmentDTO updateAssignment(@PathVariable Long id,
                                          @Valid @RequestBody UpdateAssignmentRequest request) {
        return assignmentService.updateAssignment(id, request);
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Delete assignment")
    public ResponseEntity<ApiResponse<String>> deleteAssignment(@PathVariable Long id) {
        assignmentService.deleteAssignment(id);
        return ResponseEntity.ok(ApiResponse.success("Assignment deleted successfully"));
    }

    @GetMapping("/{id}/comments")
    @Operation(summary = "Get comments for an assignment")
    public List<CommentDTO> getComments(@PathVariable Long id) {
        return assignmentService.getCommentsByAssignment(id);
    }

    @PostMapping("/{id}/comments")
    @ResponseStatus(HttpStatus.CREATED)
    @Operation(summary = "Add a comment to an assignment")
    public CommentDTO addComment(@PathVariable Long id,
                                 @RequestBody CommentDTO commentDTO,
                                 @AuthenticationPrincipal User currentUser) {
        return assignmentService.addComment(id, commentDTO, currentUser);
    }

    @GetMapping("/{id}/resources")
    @Operation(summary = "Get resources for an assignment")
    public List<ResourceDTO> getResources(@PathVariable Long id) {
        return assignmentService.getResourcesByAssignment(id);
    }

    @PostMapping("/{id}/resources")
    @ResponseStatus(HttpStatus.CREATED)
    @Operation(summary = "Add a resource to an assignment")
    public ResourceDTO addResource(@PathVariable Long id,
                                   @RequestBody ResourceDTO resourceDTO) {
        return assignmentService.addResource(id, resourceDTO);
    }

    @PostMapping("/{id}/submit")
    @Operation(summary = "Submit work for an assignment")
    public SubmissionDTO submitAssignment(@PathVariable Long id,
                                          @AuthenticationPrincipal User currentUser,
                                          @RequestBody SubmitAssignmentRequest request) {
        return assignmentService.submitAssignment(id, currentUser, request);
    }
}
