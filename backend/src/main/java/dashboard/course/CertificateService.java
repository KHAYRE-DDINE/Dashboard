package dashboard.course;

import com.lowagie.text.*;
import com.lowagie.text.pdf.PdfWriter;
import dashboard.common.BadRequestException;
import dashboard.common.ResourceNotFoundException;
import dashboard.user.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.awt.Color;
import java.io.ByteArrayOutputStream;
import java.time.format.DateTimeFormatter;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class CertificateService {

    private final CertificateRepository certificateRepository;
    private final EnrollmentRepository enrollmentRepository;

    @Transactional
    public Certificate issueCertificate(User user, Course course, Enrollment enrollment) {
        if (enrollment.getProgress() < 100) {
            throw new BadRequestException("Cannot issue certificate: course is not 100% completed.");
        }

        return certificateRepository.findByUserIdAndCourseId(user.getId(), course.getId())
                .orElseGet(() -> {
                    String code = "ALT-" + course.getId() + "-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase();
                    Certificate certificate = Certificate.builder()
                            .user(user)
                            .course(course)
                            .enrollment(enrollment)
                            .certificateCode(code)
                            .studentName(user.getFirstName() + " " + user.getLastName())
                            .courseTitle(course.getTitle())
                            .grade(enrollment.getGrade() != null ? enrollment.getGrade() : "Pass with Distinction")
                            .build();
                    return certificateRepository.save(certificate);
                });
    }

    @Transactional(readOnly = true)
    public byte[] generatePdf(UUID certificateId) {
        Certificate cert = certificateRepository.findById(certificateId)
                .orElseThrow(() -> new ResourceNotFoundException("Certificate not found with ID: " + certificateId));

        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        Document document = new Document(PageSize.A4.rotate(), 40, 40, 40, 40);

        try {
            PdfWriter.getInstance(document, baos);
            document.open();

            // Fonts
            Font brandFont = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 22, new Color(79, 70, 229));
            Font arabicFont = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 18, new Color(99, 102, 241));
            Font titleFont = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 26, new Color(30, 41, 59));
            Font certForFont = FontFactory.getFont(FontFactory.HELVETICA_OBLIQUE, 14, new Color(100, 116, 139));
            Font studentFont = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 24, new Color(15, 23, 42));
            Font bodyFont = FontFactory.getFont(FontFactory.HELVETICA, 13, new Color(71, 85, 105));
            Font courseFont = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 18, new Color(79, 70, 229));
            Font codeFont = FontFactory.getFont(FontFactory.COURIER, 10, new Color(148, 163, 184));

            // Brand Header
            Paragraph brand = new Paragraph("AL TAALIM  |  التعليم", brandFont);
            brand.setAlignment(Element.ALIGN_CENTER);
            document.add(brand);

            Paragraph subtitle = new Paragraph("Official Certificate of Educational Achievement", arabicFont);
            subtitle.setAlignment(Element.ALIGN_CENTER);
            subtitle.setSpacingAfter(25);
            document.add(subtitle);

            // Title
            Paragraph certTitle = new Paragraph("CERTIFICATE OF COMPLETION", titleFont);
            certTitle.setAlignment(Element.ALIGN_CENTER);
            certTitle.setSpacingAfter(15);
            document.add(certTitle);

            Paragraph certFor = new Paragraph("This is proudly presented to", certForFont);
            certFor.setAlignment(Element.ALIGN_CENTER);
            certFor.setSpacingAfter(10);
            document.add(certFor);

            // Student Name
            Paragraph student = new Paragraph(cert.getStudentName(), studentFont);
            student.setAlignment(Element.ALIGN_CENTER);
            student.setSpacingAfter(15);
            document.add(student);

            // Description
            Paragraph text = new Paragraph("for successfully completing with honor the academic curriculum in", bodyFont);
            text.setAlignment(Element.ALIGN_CENTER);
            document.add(text);

            // Course Name
            Paragraph courseTitle = new Paragraph(cert.getCourseTitle(), courseFont);
            courseTitle.setAlignment(Element.ALIGN_CENTER);
            courseTitle.setSpacingBefore(10);
            courseTitle.setSpacingAfter(15);
            document.add(courseTitle);

            // Details
            String gradeText = "Grade: " + cert.getGrade() + "  •  Issued on: " + DateTimeFormatter.ISO_INSTANT.format(cert.getIssuedAt());
            Paragraph details = new Paragraph(gradeText, bodyFont);
            details.setAlignment(Element.ALIGN_CENTER);
            details.setSpacingAfter(30);
            document.add(details);

            // Verification Code
            Paragraph verif = new Paragraph("Certificate Reference: " + cert.getCertificateCode() + " | Verified by Al Taalim Core Platform", codeFont);
            verif.setAlignment(Element.ALIGN_CENTER);
            document.add(verif);

            document.close();
        } catch (Exception e) {
            throw new RuntimeException("Failed to generate certificate PDF", e);
        }

        return baos.toByteArray();
    }
}
