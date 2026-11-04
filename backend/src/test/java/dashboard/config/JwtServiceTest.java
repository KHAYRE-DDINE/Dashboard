package dashboard.config;

import dashboard.user.User;
import dashboard.user.UserRole;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.test.util.ReflectionTestUtils;

import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;

class JwtServiceTest {

    private JwtService jwtService;
    private User testUser;
    private static final String TEST_SECRET = "404E635266556A586E3272357538782F413F4428472B4B6250645367566B5970";

    @BeforeEach
    void setUp() {
        jwtService = new JwtService();
        ReflectionTestUtils.setField(jwtService, "jwtSecret", TEST_SECRET);
        ReflectionTestUtils.setField(jwtService, "jwtExpirationMs", 3600000L); // 1 hour

        testUser = User.builder()
                .id(UUID.randomUUID())
                .email("student@altaalim.edu")
                .firstName("Test")
                .lastName("Student")
                .role(UserRole.STUDENT)
                .build();
    }

    @Test
    @DisplayName("Should generate valid JWT token for user and extract email")
    void shouldGenerateAndExtractUsername() {
        String token = jwtService.generateToken(testUser);
        assertNotNull(token);
        assertFalse(token.isBlank());

        String extractedEmail = jwtService.extractUsername(token);
        assertEquals("student@altaalim.edu", extractedEmail);
    }

    @Test
    @DisplayName("Should validate token against matching user details")
    void shouldValidateTokenSuccessfully() {
        String token = jwtService.generateToken(testUser);
        assertTrue(jwtService.isTokenValid(token, testUser));
    }

    @Test
    @DisplayName("Should invalidate token if user email does not match")
    void shouldFailValidationForDifferentUser() {
        String token = jwtService.generateToken(testUser);

        User differentUser = User.builder()
                .id(UUID.randomUUID())
                .email("other@altaalim.edu")
                .firstName("Other")
                .lastName("User")
                .role(UserRole.STUDENT)
                .build();

        assertFalse(jwtService.isTokenValid(token, differentUser));
    }
}
