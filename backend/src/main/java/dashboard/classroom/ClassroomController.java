package dashboard.classroom;

import dashboard.classroom.dto.ClassroomDTO;
import dashboard.classroom.dto.CreateClassRequest;
import dashboard.classroom.dto.JoinClassRequest;
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
@RequestMapping({"/api/v1/classes", "/classes"})
@Tag(name = "Classes", description = "Classroom and enrollment operations")
public class ClassroomController {

    private final ClassroomService classroomService;

    public ClassroomController(ClassroomService classroomService) {
        this.classroomService = classroomService;
    }

    @GetMapping
    @Operation(summary = "Get all classes or user classes")
    public List<ClassroomDTO> getAllClasses(@RequestParam(value = "my", required = false, defaultValue = "false") boolean myOnly,
                                            @AuthenticationPrincipal User currentUser) {
        if (myOnly && currentUser != null) {
            return classroomService.getMyClasses(currentUser);
        }
        return classroomService.getAllClasses();
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get class by ID")
    public ClassroomDTO getClassById(@PathVariable Long id) {
        return classroomService.getClassById(id);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    @Operation(summary = "Create a new class")
    public ClassroomDTO createClass(@Valid @RequestBody CreateClassRequest request,
                                    @AuthenticationPrincipal User currentUser) {
        return classroomService.createClass(currentUser, request);
    }

    @PostMapping("/join")
    @Operation(summary = "Join a class via join code")
    public ClassroomDTO joinClass(@Valid @RequestBody JoinClassRequest request,
                                  @AuthenticationPrincipal User currentUser) {
        return classroomService.joinClass(currentUser, request.getJoinCode());
    }

    @DeleteMapping("/{id}/leave")
    @Operation(summary = "Leave a class")
    public ResponseEntity<ApiResponse<String>> leaveClass(@PathVariable Long id,
                                                          @AuthenticationPrincipal User currentUser) {
        classroomService.leaveClass(currentUser, id);
        return ResponseEntity.ok(ApiResponse.success("Left class successfully"));
    }
}
