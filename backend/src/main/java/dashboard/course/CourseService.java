package dashboard.course;

import dashboard.common.ConflictException;
import dashboard.common.ResourceNotFoundException;
import dashboard.course.dto.CourseDTO;
import dashboard.course.dto.CourseDetailDTO;
import dashboard.course.dto.CreateCourseRequest;
import dashboard.course.dto.UpdateCourseRequest;
import dashboard.user.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.*;

@Service
@RequiredArgsConstructor
public class CourseService {

    private final CourseRepository courseRepository;
    private final LessonRepository lessonRepository;
    private final EnrollmentRepository enrollmentRepository;
    private final CertificateService certificateService;

    @Transactional(readOnly = true)
    public List<CourseDTO> getAllCourses(User currentUser) {
        List<Course> courses = courseRepository.findAll();
        Map<Long, Integer> progressMap = new HashMap<>();

        if (currentUser != null) {
            List<Enrollment> enrollments = enrollmentRepository.findByUserId(currentUser.getId());
            for (Enrollment e : enrollments) {
                progressMap.put(e.getCourse().getId(), e.getProgress());
            }
        }

        return courses.stream()
                .map(c -> CourseDTO.fromEntity(c, progressMap.getOrDefault(c.getId(), 0)))
                .toList();
    }

    @Transactional(readOnly = true)
    public CourseDetailDTO getCourseDetails(Long courseId, User currentUser) {
        Course course = courseRepository.findByIdWithLessons(courseId)
                .orElseThrow(() -> new ResourceNotFoundException("Course not found with ID: " + courseId));

        int progress = 0;
        Set<Long> completedLessons = Collections.emptySet();

        if (currentUser != null) {
            Optional<Enrollment> enrollmentOpt = enrollmentRepository.findByUserIdAndCourseId(currentUser.getId(), courseId);
            if (enrollmentOpt.isPresent()) {
                Enrollment enrollment = enrollmentOpt.get();
                progress = enrollment.getProgress();
                completedLessons = enrollment.getCompletedLessonIds();
            }
        }

        return CourseDetailDTO.fromEntity(course, progress, completedLessons);
    }

    @Transactional
    public CourseDTO createCourse(CreateCourseRequest request, User instructor) {
        Course course = Course.builder()
                .title(request.getTitle().trim())
                .subject(request.getSubject().trim())
                .description(request.getDescription())
                .totalHours(request.getTotalHours())
                .icon(request.getIcon() != null ? request.getIcon() : "🎓")
                .color(request.getColor() != null ? request.getColor() : "bg-indigo-500")
                .instructor(instructor)
                .build();

        Course saved = courseRepository.save(course);
        return CourseDTO.fromEntity(saved, 0);
    }

    @Transactional
    public CourseDTO updateCourse(Long courseId, UpdateCourseRequest request) {
        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new ResourceNotFoundException("Course not found with ID: " + courseId));

        if (request.getTitle() != null) course.setTitle(request.getTitle().trim());
        if (request.getSubject() != null) course.setSubject(request.getSubject().trim());
        if (request.getDescription() != null) course.setDescription(request.getDescription().trim());
        if (request.getTotalHours() != null) course.setTotalHours(request.getTotalHours());
        if (request.getIcon() != null) course.setIcon(request.getIcon());

        Course saved = courseRepository.save(course);
        return CourseDTO.fromEntity(saved, 0);
    }

    @Transactional
    public void deleteCourse(Long courseId) {
        if (!courseRepository.existsById(courseId)) {
            throw new ResourceNotFoundException("Course not found with ID: " + courseId);
        }
        courseRepository.deleteById(courseId);
    }

    @Transactional
    public Enrollment enroll(Long courseId, User user) {
        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new ResourceNotFoundException("Course not found with ID: " + courseId));

        Optional<Enrollment> existing = enrollmentRepository.findByUserIdAndCourseId(user.getId(), courseId);
        if (existing.isPresent()) {
            throw new ConflictException("User is already enrolled in course: " + course.getTitle());
        }

        Enrollment enrollment = Enrollment.builder()
                .user(user)
                .course(course)
                .progress(0)
                .isArchived(false)
                .build();

        return enrollmentRepository.save(enrollment);
    }

    @Transactional
    public CourseDetailDTO completeLesson(Long lessonId, User user) {
        Lesson lesson = lessonRepository.findById(lessonId)
                .orElseThrow(() -> new ResourceNotFoundException("Lesson not found with ID: " + lessonId));

        Course course = lesson.getCourse();
        Enrollment enrollment = enrollmentRepository.findByUserIdAndCourseId(user.getId(), course.getId())
                .orElseGet(() -> enroll(course.getId(), user));

        enrollment.getCompletedLessonIds().add(lessonId);

        int totalLessons = course.getLessons().size();
        if (totalLessons > 0) {
            int completedCount = enrollment.getCompletedLessonIds().size();
            int newProgress = Math.min(100, (int) Math.round(((double) completedCount / totalLessons) * 100));
            enrollment.setProgress(newProgress);

            if (newProgress == 100 && enrollment.getCompletedAt() == null) {
                enrollment.setCompletedAt(Instant.now());
                enrollment.setGrade("A+");
                certificateService.issueCertificate(user, course, enrollment);
            }
        }

        enrollmentRepository.save(enrollment);
        return getCourseDetails(course.getId(), user);
    }

    @Transactional
    public void archiveCourse(Long courseId, User user) {
        Enrollment enrollment = enrollmentRepository.findByUserIdAndCourseId(user.getId(), courseId)
                .orElseThrow(() -> new ResourceNotFoundException("Enrollment not found for course: " + courseId));
        enrollment.setArchived(true);
        enrollmentRepository.save(enrollment);
    }

    @Transactional
    public void restoreArchivedCourse(Long courseId, User user) {
        Enrollment enrollment = enrollmentRepository.findByUserIdAndCourseId(user.getId(), courseId)
                .orElseThrow(() -> new ResourceNotFoundException("Enrollment not found for course: " + courseId));
        enrollment.setArchived(false);
        enrollmentRepository.save(enrollment);
    }
}
