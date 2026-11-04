package dashboard.assignment;

import dashboard.assignment.dto.*;
import dashboard.common.BadRequestException;
import dashboard.common.ResourceNotFoundException;
import dashboard.user.User;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class AssignmentService {

    private final AssignmentRepository assignmentRepository;
    private final AssignmentCommentRepository commentRepository;
    private final AssignmentResourceRepository resourceRepository;
    private final SubmissionRepository submissionRepository;

    public AssignmentService(AssignmentRepository assignmentRepository,
                             AssignmentCommentRepository commentRepository,
                             AssignmentResourceRepository resourceRepository,
                             SubmissionRepository submissionRepository) {
        this.assignmentRepository = assignmentRepository;
        this.commentRepository = commentRepository;
        this.resourceRepository = resourceRepository;
        this.submissionRepository = submissionRepository;
    }

    @Transactional(readOnly = true)
    public List<AssignmentDTO> getAllAssignments(String status) {
        List<Assignment> list;
        if (status != null && !status.trim().isEmpty() && !status.equalsIgnoreCase("all")) {
            list = assignmentRepository.findByStatus(status.toLowerCase());
        } else {
            list = assignmentRepository.findAll();
        }
        return list.stream().map(AssignmentDTO::fromEntity).collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public AssignmentDetailDTO getAssignmentById(Long id, User currentUser) {
        Assignment assignment = assignmentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Assignment not found with id: " + id));

        AssignmentDetailDTO detail = AssignmentDetailDTO.fromEntity(assignment);

        if (currentUser != null) {
            submissionRepository.findByAssignmentIdAndUserId(id, currentUser.getId())
                    .ifPresent(sub -> detail.setSubmission(SubmissionDTO.fromEntity(sub)));
        }

        return detail;
    }

    public AssignmentDTO createAssignment(CreateAssignmentRequest request, User currentUser) {
        Assignment assignment = Assignment.builder()
                .title(request.getTitle())
                .subject(request.getSubject())
                .description(request.getDescription())
                .dueDate(request.getDate() != null ? request.getDate() : "Aug 25")
                .dueTime(request.getTime() != null ? request.getTime() : "23:59")
                .status(request.getStatus() != null ? request.getStatus().toLowerCase() : "pending")
                .color(request.getColor() != null ? request.getColor() : "bg-blue-100 text-blue-700")
                .teacher(currentUser != null ? currentUser.getFirstName() + " " + currentUser.getLastName() : "Instructor")
                .createdBy(currentUser)
                .build();

        Assignment saved = assignmentRepository.save(assignment);
        return AssignmentDTO.fromEntity(saved);
    }

    public AssignmentDTO updateAssignment(Long id, UpdateAssignmentRequest request) {
        Assignment assignment = assignmentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Assignment not found with id: " + id));

        if (request.getTitle() != null) assignment.setTitle(request.getTitle());
        if (request.getSubject() != null) assignment.setSubject(request.getSubject());
        if (request.getDescription() != null) assignment.setDescription(request.getDescription());
        if (request.getStatus() != null) assignment.setStatus(request.getStatus().toLowerCase());
        if (request.getDate() != null) assignment.setDueDate(request.getDate());
        if (request.getTime() != null) assignment.setDueTime(request.getTime());
        if (request.getColor() != null) assignment.setColor(request.getColor());

        Assignment updated = assignmentRepository.save(assignment);
        return AssignmentDTO.fromEntity(updated);
    }

    public void deleteAssignment(Long id) {
        if (!assignmentRepository.existsById(id)) {
            throw new ResourceNotFoundException("Assignment not found with id: " + id);
        }
        assignmentRepository.deleteById(id);
    }

    @Transactional(readOnly = true)
    public List<CommentDTO> getAllComments() {
        return commentRepository.findAll().stream()
                .map(CommentDTO::fromEntity)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<CommentDTO> getCommentsByAssignment(Long assignmentId) {
        return commentRepository.findByAssignmentIdOrderByCreatedAtDesc(assignmentId).stream()
                .map(CommentDTO::fromEntity)
                .collect(Collectors.toList());
    }

    public CommentDTO addComment(Long assignmentId, CommentDTO commentDTO, User currentUser) {
        Assignment assignment = null;
        if (assignmentId != null) {
            assignment = assignmentRepository.findById(assignmentId).orElse(null);
        }

        String author = commentDTO.getName();
        if (currentUser != null && (author == null || author.isBlank())) {
            author = currentUser.getFirstName() + " " + currentUser.getLastName();
        } else if (author == null || author.isBlank()) {
            author = "Student";
        }

        AssignmentComment comment = AssignmentComment.builder()
                .assignment(assignment)
                .user(currentUser)
                .authorName(author)
                .authorAvatar(commentDTO.getAvatar() != null ? commentDTO.getAvatar() : (currentUser != null ? currentUser.getAvatar() : null))
                .text(commentDTO.getText())
                .createdAt(Instant.now())
                .build();

        AssignmentComment saved = commentRepository.save(comment);
        return CommentDTO.fromEntity(saved);
    }

    @Transactional(readOnly = true)
    public List<ResourceDTO> getAllResources() {
        return resourceRepository.findAll().stream()
                .map(ResourceDTO::fromEntity)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<ResourceDTO> getResourcesByAssignment(Long assignmentId) {
        return resourceRepository.findByAssignmentId(assignmentId).stream()
                .map(ResourceDTO::fromEntity)
                .collect(Collectors.toList());
    }

    public ResourceDTO addResource(Long assignmentId, ResourceDTO resourceDTO) {
        Assignment assignment = null;
        if (assignmentId != null) {
            assignment = assignmentRepository.findById(assignmentId).orElse(null);
        }

        AssignmentResource resource = AssignmentResource.builder()
                .assignment(assignment)
                .title(resourceDTO.getTitle())
                .subject(resourceDTO.getSubject())
                .type(resourceDTO.getType() != null ? resourceDTO.getType() : "pdf")
                .size(resourceDTO.getSize())
                .url(resourceDTO.getUrl())
                .description(resourceDTO.getDescription())
                .imageUrl(resourceDTO.getImage())
                .createdAt(Instant.now())
                .build();

        AssignmentResource saved = resourceRepository.save(resource);
        return ResourceDTO.fromEntity(saved);
    }

    public SubmissionDTO submitAssignment(Long assignmentId, User currentUser, SubmitAssignmentRequest request) {
        if (currentUser == null) {
            throw new BadRequestException("Must be authenticated to submit assignment");
        }

        Assignment assignment = assignmentRepository.findById(assignmentId)
                .orElseThrow(() -> new ResourceNotFoundException("Assignment not found with id: " + assignmentId));

        Submission submission = submissionRepository.findByAssignmentIdAndUserId(assignmentId, currentUser.getId())
                .orElse(Submission.builder()
                        .assignment(assignment)
                        .user(currentUser)
                        .build());

        submission.setContent(request.getContent());
        submission.setFileUrl(request.getFileUrl());
        submission.setStatus("submitted");
        submission.setSubmittedAt(Instant.now());

        Submission saved = submissionRepository.save(submission);
        return SubmissionDTO.fromEntity(saved);
    }
}
