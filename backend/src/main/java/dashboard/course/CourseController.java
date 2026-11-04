package dashboard.course;

import dashboard.common.ApiResponse;
import dashboard.course.dto.CourseDTO;
import dashboard.course.dto.CourseDetailDTO;
import dashboard.course.dto.CreateCourseRequest;
import dashboard.course.dto.UpdateCourseRequest;
import dashboard.user.User;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/courses")
@RequiredArgsConstructor
public class CourseController {

    private final CourseService courseService;
    private final CertificateService certificateService;
    private final CertificateRepository certificateRepository;

    @GetMapping
    public ResponseEntity<ApiResponse<List<CourseDTO>>> getAllCourses(@AuthenticationPrincipal User currentUser) {
        List<CourseDTO> courses = courseService.getAllCourses(currentUser);
        return ResponseEntity.ok(ApiResponse.ok(courses));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<CourseDetailDTO>> getCourseDetails(
            @PathVariable Long id,
            @AuthenticationPrincipal User currentUser
    ) {
        CourseDetailDTO course = courseService.getCourseDetails(id, currentUser);
        return ResponseEntity.ok(ApiResponse.ok(course));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<CourseDTO>> createCourse(
            @Valid @RequestBody CreateCourseRequest request,
            @AuthenticationPrincipal User currentUser
    ) {
        CourseDTO created = courseService.createCourse(request, currentUser);
        return ResponseEntity.ok(ApiResponse.ok("Course created successfully.", created));
    }

    @PatchMapping("/{id}")
    public ResponseEntity<ApiResponse<CourseDTO>> updateCourse(
            @PathVariable Long id,
            @RequestBody UpdateCourseRequest request
    ) {
        CourseDTO updated = courseService.updateCourse(id, request);
        return ResponseEntity.ok(ApiResponse.ok("Course updated successfully.", updated));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteCourse(@PathVariable Long id) {
        courseService.deleteCourse(id);
        return ResponseEntity.ok(ApiResponse.ok("Course deleted successfully.", null));
    }

    @PostMapping("/{id}/enroll")
    public ResponseEntity<ApiResponse<Void>> enroll(
            @PathVariable Long id,
            @AuthenticationPrincipal User currentUser
    ) {
        courseService.enroll(id, currentUser);
        return ResponseEntity.ok(ApiResponse.ok("Enrolled in course successfully.", null));
    }

    @PostMapping("/lessons/{lessonId}/complete")
    public ResponseEntity<ApiResponse<CourseDetailDTO>> completeLesson(
            @PathVariable Long lessonId,
            @AuthenticationPrincipal User currentUser
    ) {
        CourseDetailDTO updated = courseService.completeLesson(lessonId, currentUser);
        return ResponseEntity.ok(ApiResponse.ok("Lesson marked as complete.", updated));
    }

    @PostMapping("/{id}/archive")
    public ResponseEntity<ApiResponse<Void>> archiveCourse(
            @PathVariable Long id,
            @AuthenticationPrincipal User currentUser
    ) {
        courseService.archiveCourse(id, currentUser);
        return ResponseEntity.ok(ApiResponse.ok("Course archived successfully.", null));
    }

    @PostMapping("/{id}/restore")
    public ResponseEntity<ApiResponse<Void>> restoreCourse(
            @PathVariable Long id,
            @AuthenticationPrincipal User currentUser
    ) {
        courseService.restoreArchivedCourse(id, currentUser);
        return ResponseEntity.ok(ApiResponse.ok("Course restored successfully.", null));
    }

    @GetMapping("/{courseId}/certificate/download")
    public ResponseEntity<byte[]> downloadCertificate(
            @PathVariable Long courseId,
            @AuthenticationPrincipal User currentUser
    ) {
        Certificate cert = certificateRepository.findByUserIdAndCourseId(currentUser.getId(), courseId)
                .orElseThrow(() -> new dashboard.common.ResourceNotFoundException("Certificate not available. Please complete course first."));

        byte[] pdfBytes = certificateService.generatePdf(cert.getId());

        return ResponseEntity.ok()
                .contentType(MediaType.APPLICATION_PDF)
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"al-taalim-certificate-" + cert.getCertificateCode() + ".pdf\"")
                .body(pdfBytes);
    }
}
