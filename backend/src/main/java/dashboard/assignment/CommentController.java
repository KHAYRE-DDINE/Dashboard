package dashboard.assignment;

import dashboard.assignment.dto.CommentDTO;
import dashboard.user.User;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping({"/api/v1/comments", "/comments"})
@Tag(name = "Comments", description = "Global comments endpoint for direct discussion access")
public class CommentController {

    private final AssignmentService assignmentService;

    public CommentController(AssignmentService assignmentService) {
        this.assignmentService = assignmentService;
    }

    @GetMapping
    @Operation(summary = "Get all comments")
    public List<CommentDTO> getAllComments() {
        return assignmentService.getAllComments();
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    @Operation(summary = "Post a comment")
    public CommentDTO postComment(@RequestBody CommentDTO commentDTO,
                                  @AuthenticationPrincipal User currentUser) {
        return assignmentService.addComment(commentDTO.getAssignmentId(), commentDTO, currentUser);
    }
}
