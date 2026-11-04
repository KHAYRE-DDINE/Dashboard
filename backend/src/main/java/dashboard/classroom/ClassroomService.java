package dashboard.classroom;

import dashboard.classroom.dto.ClassroomDTO;
import dashboard.classroom.dto.CreateClassRequest;
import dashboard.common.BadRequestException;
import dashboard.common.ConflictException;
import dashboard.common.ResourceNotFoundException;
import dashboard.user.User;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.security.SecureRandom;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class ClassroomService {

    private final ClassroomRepository classroomRepository;
    private final ClassMembershipRepository membershipRepository;
    private static final String CHARACTERS = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    private final SecureRandom random = new SecureRandom();

    public ClassroomService(ClassroomRepository classroomRepository,
                            ClassMembershipRepository membershipRepository) {
        this.classroomRepository = classroomRepository;
        this.membershipRepository = membershipRepository;
    }

    @Transactional(readOnly = true)
    public List<ClassroomDTO> getAllClasses() {
        return classroomRepository.findAll().stream()
                .map(ClassroomDTO::fromEntity)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<ClassroomDTO> getMyClasses(User user) {
        return classroomRepository.findClassesByUserId(user.getId()).stream()
                .map(ClassroomDTO::fromEntity)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public ClassroomDTO getClassById(Long id) {
        Classroom classroom = classroomRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Class not found with id: " + id));
        return ClassroomDTO.fromEntity(classroom);
    }

    public ClassroomDTO createClass(User currentUser, CreateClassRequest request) {
        String joinCode = generateUniqueJoinCode();
        Classroom classroom = Classroom.builder()
                .title(request.getTitle())
                .subject(request.getSubject())
                .instructor(request.getInstructor() != null ? request.getInstructor() : currentUser.getFirstName() + " " + currentUser.getLastName())
                .instructorUser(currentUser)
                .joinCode(joinCode)
                .room(request.getRoom())
                .time(request.getTime())
                .date(request.getDate())
                .status("Active")
                .build();

        Classroom saved = classroomRepository.save(classroom);

        // Add creator as member/teacher
        ClassMembership membership = ClassMembership.builder()
                .classroom(saved)
                .user(currentUser)
                .role("TEACHER")
                .build();
        membershipRepository.save(membership);

        return ClassroomDTO.fromEntity(saved);
    }

    public ClassroomDTO joinClass(User currentUser, String joinCode) {
        if (joinCode == null || joinCode.trim().isEmpty()) {
            throw new BadRequestException("Join code is required");
        }

        Classroom classroom = classroomRepository.findByJoinCode(joinCode.trim().toUpperCase())
                .orElseThrow(() -> new ResourceNotFoundException("Invalid class code: " + joinCode));

        if (membershipRepository.existsByClassroomIdAndUserId(classroom.getId(), currentUser.getId())) {
            throw new ConflictException("You are already enrolled in this class");
        }

        ClassMembership membership = ClassMembership.builder()
                .classroom(classroom)
                .user(currentUser)
                .role("STUDENT")
                .build();
        membershipRepository.save(membership);

        return ClassroomDTO.fromEntity(classroom);
    }

    public void leaveClass(User currentUser, Long classId) {
        ClassMembership membership = membershipRepository.findByClassroomIdAndUserId(classId, currentUser.getId())
                .orElseThrow(() -> new ResourceNotFoundException("You are not a member of this class"));
        membershipRepository.delete(membership);
    }

    private String generateUniqueJoinCode() {
        for (int i = 0; i < 10; i++) {
            StringBuilder sb = new StringBuilder(6);
            for (int j = 0; j < 6; j++) {
                sb.append(CHARACTERS.charAt(random.nextInt(CHARACTERS.length())));
            }
            String code = sb.toString();
            if (classroomRepository.findByJoinCode(code).isEmpty()) {
                return code;
            }
        }
        return "CLS-" + System.currentTimeMillis() % 100000;
    }
}
