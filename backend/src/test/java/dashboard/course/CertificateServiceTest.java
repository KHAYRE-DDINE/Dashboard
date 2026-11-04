package dashboard.course;

import dashboard.user.User;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class CertificateServiceTest {

    @Mock
    private CertificateRepository certificateRepository;

    @Mock
    private EnrollmentRepository enrollmentRepository;

    @InjectMocks
    private CertificateService certificateService;

    private User student;
    private Course course;
    private Enrollment completedEnrollment;

    @BeforeEach
    void setUp() {
        student = User.builder()
                .id(UUID.randomUUID())
                .email("student@altaalim.edu")
                .firstName("Sara")
                .lastName("Hassan")
                .build();

        course = Course.builder()
                .id(10L)
                .title("Advanced Physics & Mechanics")
                .subject("Physics")
                .totalHours(45)
                .build();

        completedEnrollment = Enrollment.builder()
                .id(1L)
                .user(student)
                .course(course)
                .progress(100)
                .grade("A")
                .build();
    }

    @Test
    @DisplayName("Should issue certificate when course enrollment is 100% completed")
    void shouldIssueCertificateForCompletedCourse() {
        when(certificateRepository.findByUserIdAndCourseId(student.getId(), course.getId()))
                .thenReturn(Optional.empty());

        when(certificateRepository.save(any(Certificate.class))).thenAnswer(invocation -> invocation.getArgument(0));

        Certificate cert = certificateService.issueCertificate(student, course, completedEnrollment);

        assertNotNull(cert);
        assertEquals("Sara Hassan", cert.getStudentName());
        assertTrue(cert.getCertificateCode().startsWith("ALT-10-"));
    }

    @Test
    @DisplayName("Should generate valid binary PDF certificate with %PDF magic header")
    void shouldGenerateValidPdfCertificate() {
        UUID certId = UUID.randomUUID();
        Certificate certificate = Certificate.builder()
                .id(certId)
                .user(student)
                .course(course)
                .enrollment(completedEnrollment)
                .certificateCode("ALT-10-TEST1234")
                .studentName("Sara Hassan")
                .courseTitle("Advanced Physics & Mechanics")
                .grade("A")
                .build();

        when(certificateRepository.findById(certId)).thenReturn(Optional.of(certificate));

        byte[] pdfBytes = certificateService.generatePdf(certId);

        assertNotNull(pdfBytes);
        assertTrue(pdfBytes.length > 500, "PDF should have substantial content length");

        // Verify PDF Magic Bytes (%PDF-)
        String header = new String(pdfBytes, 0, 5);
        assertEquals("%PDF-", header, "File must start with standard PDF magic number");
    }
}
