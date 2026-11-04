package dashboard.search;

import dashboard.assignment.AssignmentRepository;
import dashboard.classroom.ClassroomRepository;
import dashboard.course.CourseRepository;
import dashboard.library.LibraryRepository;
import dashboard.search.dto.SearchResultDTO;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@Transactional(readOnly = true)
public class SearchService {

    private final CourseRepository courseRepository;
    private final AssignmentRepository assignmentRepository;
    private final ClassroomRepository classroomRepository;
    private final LibraryRepository libraryRepository;

    public SearchService(CourseRepository courseRepository,
                         AssignmentRepository assignmentRepository,
                         ClassroomRepository classroomRepository,
                         LibraryRepository libraryRepository) {
        this.courseRepository = courseRepository;
        this.assignmentRepository = assignmentRepository;
        this.classroomRepository = classroomRepository;
        this.libraryRepository = libraryRepository;
    }

    public List<SearchResultDTO> search(String query) {
        if (query == null || query.trim().length() < 2) {
            return List.of();
        }
        String q = query.trim();
        List<SearchResultDTO> results = new ArrayList<>();

        // Search Courses
        courseRepository.searchCourses(q).forEach(course ->
                results.add(SearchResultDTO.builder()
                        .type("COURSE")
                        .id(course.getId())
                        .title(course.getTitle())
                        .subtitle(course.getSubject() + " • " + course.getTotalHours() + " hrs")
                        .link("/dashboard/courses/details/" + course.getId())
                        .icon("📖")
                        .build())
        );

        // Search Assignments
        assignmentRepository.searchAssignments(q).forEach(assign ->
                results.add(SearchResultDTO.builder()
                        .type("ASSIGNMENT")
                        .id(assign.getId())
                        .title(assign.getTitle())
                        .subtitle(assign.getSubject() + " • Due " + assign.getDueDate())
                        .link("/dashboard/assignments/about/" + assign.getId())
                        .icon("📝")
                        .build())
        );

        // Search Classes
        classroomRepository.searchClasses(q).forEach(cls ->
                results.add(SearchResultDTO.builder()
                        .type("CLASS")
                        .id(cls.getId())
                        .title(cls.getTitle())
                        .subtitle(cls.getSubject() + " • " + cls.getInstructor())
                        .link("/dashboard/classes")
                        .icon("🏫")
                        .build())
        );

        // Search Library
        libraryRepository.searchLibrary(q).forEach(book ->
                results.add(SearchResultDTO.builder()
                        .type("LIBRARY")
                        .id(book.getId())
                        .title(book.getTitle())
                        .subtitle(book.getAuthor() + " • " + book.getCategory())
                        .link("/dashboard/library")
                        .icon("📚")
                        .build())
        );

        return results;
    }
}
