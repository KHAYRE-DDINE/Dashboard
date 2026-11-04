package dashboard.assignment;

import dashboard.assignment.dto.*;
import dashboard.user.User;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class AssignmentServiceTest {

    @Mock
    private AssignmentRepository assignmentRepository;

    @Mock
    private AssignmentCommentRepository commentRepository;

    @Mock
    private AssignmentResourceRepository resourceRepository;

    @Mock
    private SubmissionRepository submissionRepository;

    @InjectMocks
    private AssignmentService assignmentService;

    private User teacher;
    private Assignment assignment;

    @BeforeEach
    void setUp() {
        teacher = User.builder()
                .id(UUID.randomUUID())
                .firstName("Professor")
                .lastName("Ahmed")
                .email("ahmed@altaalim.edu")
                .build();

        assignment = Assignment.builder()
                .id(1L)
                .title("Algebra Quiz 1")
                .subject("Mathematics")
                .description("Solve equations 1 through 10")
                .dueDate("Aug 20")
                .dueTime("23:59")
                .status("pending")
                .color("bg-blue-100 text-blue-700")
                .teacher("Professor Ahmed")
                .build();
    }

    @Test
    @DisplayName("Should retrieve all assignments filtered by status")
    void shouldGetAllAssignments() {
        when(assignmentRepository.findByStatus("pending")).thenReturn(List.of(assignment));

        List<AssignmentDTO> result = assignmentService.getAllAssignments("pending");

        assertEquals(1, result.size());
        assertEquals("Algebra Quiz 1", result.get(0).getTitle());
        verify(assignmentRepository).findByStatus("pending");
    }

    @Test
    @DisplayName("Should create assignment successfully")
    void shouldCreateAssignment() {
        CreateAssignmentRequest request = CreateAssignmentRequest.builder()
                .title("Calculus Midterm")
                .subject("Mathematics")
                .description("Midterm test")
                .date("Aug 25")
                .time("14:00")
                .status("pending")
                .build();

        when(assignmentRepository.save(any(Assignment.class))).thenAnswer(invocation -> {
            Assignment saved = invocation.getArgument(0);
            saved.setId(99L);
            return saved;
        });

        AssignmentDTO created = assignmentService.createAssignment(request, teacher);

        assertNotNull(created);
        assertEquals("Calculus Midterm", created.getTitle());
        assertEquals("Professor Ahmed", created.getTeacher());
        verify(assignmentRepository).save(any(Assignment.class));
    }

    @Test
    @DisplayName("Should add comment to an assignment")
    void shouldAddComment() {
        when(assignmentRepository.findById(1L)).thenReturn(Optional.of(assignment));

        CommentDTO request = CommentDTO.builder()
                .text("When is the exact deadline?")
                .name("Student")
                .build();

        when(commentRepository.save(any(AssignmentComment.class))).thenAnswer(invocation -> {
            AssignmentComment saved = invocation.getArgument(0);
            saved.setId(50L);
            return saved;
        });

        CommentDTO savedComment = assignmentService.addComment(1L, request, teacher);

        assertNotNull(savedComment);
        assertEquals("When is the exact deadline?", savedComment.getText());
        verify(commentRepository).save(any(AssignmentComment.class));
    }
}
