# Backend Code Guide: Auth, Assignment, Calendar

Use this file after creating the backend structure. It explains what to put inside the main files for:

- `dashboard.auth`
- `dashboard.assignment`
- `dashboard.calendar`

Your actual backend root is:

```text
backend/backend/
```

Your Java package root is:

```text
backend/backend/src/main/java/dashboard/
```

Important: these snippets are a guide. Add them gradually, run Maven often, and fix package/import names as your IDE suggests.

## 0. First Fix `pom.xml`

Your current `pom.xml` has Web MVC, JPA, Actuator, Lombok, and MySQL. For auth, validation, and JWT you still need Security, Validation, and JWT dependencies.

Add these dependencies inside `<dependencies>`:

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-security</artifactId>
</dependency>

<dependency>
    <groupId>org.springframework.boot</groupId> 
    <artifactId>spring-boot-starter-validation</artifactId>
</dependency>

<dependency>
    <groupId>io.jsonwebtoken</groupId>
    <artifactId>jjwt-api</artifactId>
    <version>0.12.6</version>
</dependency>
<dependency>
    <groupId>io.jsonwebtoken</groupId>
    <artifactId>jjwt-impl</artifactId>
    <version>0.12.6</version>
    <scope>runtime</scope>
</dependency>
<dependency>
    <groupId>io.jsonwebtoken</groupId>
    <artifactId>jjwt-jackson</artifactId>
    <version>0.12.6</version>
    <scope>runtime</scope>
</dependency>
```

You also have both:

```xml
mysql:mysql-connector-java
com.mysql:mysql-connector-j
```

Keep only this one:

```xml
<dependency>
    <groupId>com.mysql</groupId>
    <artifactId>mysql-connector-j</artifactId>
    <scope>runtime</scope>
</dependency>
```

## 1. Application Config

File:

```text
backend/backend/src/main/resources/application.properties
```

Put this for local MySQL development:

```properties
spring.application.name=dashboard-backend

server.port=8080

spring.datasource.url=jdbc:mysql://localhost:3306/dashboard_db?createDatabaseIfNotExist=true&useSSL=false&serverTimezone=UTC
spring.datasource.username=root
spring.datasource.password=
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.format_sql=true

app.jwt.secret=change-this-secret-to-a-long-random-string-at-least-32-characters
app.jwt.expiration-ms=86400000

app.cors.allowed-origin=http://localhost:3000
```

For the first version, `ddl-auto=update` is fine. Later replace it with Flyway migrations.

## 2. Required User Files For Auth

Auth depends on `User`, `UserRepository`, and `UserRole`. Implement these before `auth`.

### `dashboard/user/UserRole.java`

```java
package dashboard.user;

public enum UserRole {
    STUDENT,
    TEACHER,
    PARENT,
    ADMIN
}
```

### `dashboard/user/User.java`

```java
package dashboard.user;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.time.Instant;
import java.util.Collection;
import java.util.List;
import java.util.UUID;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "users", indexes = {
        @Index(name = "idx_users_email", columnList = "email", unique = true)
})
public class User implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(nullable = false, unique = true, length = 160)
    private String email;

    @Column(nullable = false)
    private String passwordHash;

    @Column(nullable = false, length = 80)
    private String firstName;

    @Column(nullable = false, length = 80)
    private String lastName;

    private String phone;

    @Column(length = 800)
    private String bio;

    @Column(length = 40)
    private String language;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 30)
    private UserRole role;

    @Column(nullable = false)
    private Instant createdAt;

    @Column(nullable = false)
    private Instant updatedAt;

    @PrePersist
    void onCreate() {
        Instant now = Instant.now();
        createdAt = now;
        updatedAt = now;
        if (role == null) role = UserRole.STUDENT;
        if (language == null) language = "English";
    }

    @PreUpdate
    void onUpdate() {
        updatedAt = Instant.now();
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority("ROLE_" + role.name()));
    }

    @Override
    public String getPassword() {
        return passwordHash;
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
```

### `dashboard/user/UserRepository.java`

```java
package dashboard.user;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface UserRepository extends JpaRepository<User, UUID> {
    Optional<User> findByEmail(String email);
    boolean existsByEmail(String email);
}
```

### `dashboard/user/dto/UserDto.java`

```java
package dashboard.user.dto;

import dashboard.user.User;
import dashboard.user.UserRole;

import java.util.UUID;

public record UserDto(
        UUID id,
        String email,
        String firstName,
        String lastName,
        String phone,
        String bio,
        String language,
        UserRole role
) {
    public static UserDto from(User user) {
        return new UserDto(
                user.getId(),
                user.getEmail(),
                user.getFirstName(),
                user.getLastName(),
                user.getPhone(),
                user.getBio(),
                user.getLanguage(),
                user.getRole()
        );
    }
}
```

## 3. Auth Files

### `dashboard/auth/dto/RegisterRequest.java`

```java
package dashboard.auth.dto;

import dashboard.user.UserRole;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record RegisterRequest(
        @NotBlank @Email String email,
        @NotBlank @Size(min = 8) String password,
        @NotBlank String firstName,
        @NotBlank String lastName,
        String phone,
        UserRole role
) {
}
```

### `dashboard/auth/dto/LoginRequest.java`

```java
package dashboard.auth.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public record LoginRequest(
        @NotBlank @Email String email,
        @NotBlank String password
) {
}
```

### `dashboard/auth/dto/AuthResponse.java`

```java
package dashboard.auth.dto;

import dashboard.user.dto.UserDto;

public record AuthResponse(
        String accessToken,
        String tokenType,
        long expiresIn,
        UserDto user
) {
}
```

### `dashboard/auth/dto/RefreshTokenRequest.java`

For now, keep it simple. You can implement refresh tokens later.

```java
package dashboard.auth.dto;

import jakarta.validation.constraints.NotBlank;

public record RefreshTokenRequest(
        @NotBlank String refreshToken
) {
}
```

### `dashboard/config/JwtService.java`

```java
package dashboard.config;

import dashboard.user.User;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.time.Instant;
import java.util.Date;

@Service
public class JwtService {

    @Value("${app.jwt.secret}")
    private String secret;

    @Value("${app.jwt.expiration-ms}")
    private long expirationMs;

    public String generateToken(User user) {
        Instant now = Instant.now();
        return Jwts.builder()
                .subject(user.getEmail())
                .claim("userId", user.getId().toString())
                .claim("role", user.getRole().name())
                .issuedAt(Date.from(now))
                .expiration(Date.from(now.plusMillis(expirationMs)))
                .signWith(getSigningKey())
                .compact();
    }

    public String extractUsername(String token) {
        return getClaims(token).getSubject();
    }

    public boolean isTokenValid(String token, User user) {
        String username = extractUsername(token);
        return username.equals(user.getEmail()) && !isExpired(token);
    }

    public long getExpirationMs() {
        return expirationMs;
    }

    private boolean isExpired(String token) {
        return getClaims(token).getExpiration().before(new Date());
    }

    private Claims getClaims(String token) {
        return Jwts.parser()
                .verifyWith(getSigningKey())
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }

    private SecretKey getSigningKey() {
        return Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));
    }
}
```

### `dashboard/config/JwtAuthenticationFilter.java`

```java
package dashboard.config;

import dashboard.user.User;
import dashboard.user.UserRepository;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtService jwtService;
    private final UserRepository userRepository;

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain
    ) throws ServletException, IOException {

        String header = request.getHeader("Authorization");

        if (header == null || !header.startsWith("Bearer ")) {
            filterChain.doFilter(request, response);
            return;
        }

        String token = header.substring(7);
        String email = jwtService.extractUsername(token);

        if (email != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            User user = userRepository.findByEmail(email).orElse(null);

            if (user != null && jwtService.isTokenValid(token, user)) {
                UsernamePasswordAuthenticationToken authToken =
                        new UsernamePasswordAuthenticationToken(user, null, user.getAuthorities());
                authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                SecurityContextHolder.getContext().setAuthentication(authToken);
            }
        }

        filterChain.doFilter(request, response);
    }
}
```

### `dashboard/config/SecurityConfig.java`

```java
package dashboard.config;

import dashboard.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@RequiredArgsConstructor
public class SecurityConfig {

    private final JwtAuthenticationFilter jwtAuthenticationFilter;
    private final UserRepository userRepository;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable())
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/api/auth/**").permitAll()
                        .requestMatchers("/actuator/health").permitAll()
                        .anyRequest().authenticated()
                )
                .authenticationProvider(authenticationProvider())
                .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    @Bean
    public UserDetailsService userDetailsService() {
        return username -> userRepository.findByEmail(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
    }

    @Bean
    public AuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
        provider.setUserDetailsService(userDetailsService());
        provider.setPasswordEncoder(passwordEncoder());
        return provider;
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration configuration) throws Exception {
        return configuration.getAuthenticationManager();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
```

### `dashboard/config/CorsConfig.java`

```java
package dashboard.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

@Configuration
public class CorsConfig {

    @Value("${app.cors.allowed-origin}")
    private String allowedOrigin;

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowedOrigins(List.of(allowedOrigin));
        config.setAllowedMethods(List.of("GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"));
        config.setAllowedHeaders(List.of("Authorization", "Content-Type"));
        config.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);
        return source;
    }
}
```

Later, connect this CORS config inside `SecurityConfig` with:

```java
.cors(cors -> {})
```

### `dashboard/auth/AuthService.java`

```java
package dashboard.auth;

import dashboard.auth.dto.AuthResponse;
import dashboard.auth.dto.LoginRequest;
import dashboard.auth.dto.RegisterRequest;
import dashboard.config.JwtService;
import dashboard.user.User;
import dashboard.user.UserRepository;
import dashboard.user.UserRole;
import dashboard.user.dto.UserDto;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;

    public AuthResponse register(RegisterRequest request) {
        if (userRepository.existsByEmail(request.email())) {
            throw new IllegalArgumentException("Email is already registered");
        }

        User user = User.builder()
                .email(request.email())
                .passwordHash(passwordEncoder.encode(request.password()))
                .firstName(request.firstName())
                .lastName(request.lastName())
                .phone(request.phone())
                .role(request.role() == null ? UserRole.STUDENT : request.role())
                .build();

        User saved = userRepository.save(user);
        String token = jwtService.generateToken(saved);

        return new AuthResponse(token, "Bearer", jwtService.getExpirationMs(), UserDto.from(saved));
    }

    public AuthResponse login(LoginRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.email(), request.password())
        );

        User user = userRepository.findByEmail(request.email())
                .orElseThrow(() -> new IllegalArgumentException("Invalid email or password"));

        String token = jwtService.generateToken(user);
        return new AuthResponse(token, "Bearer", jwtService.getExpirationMs(), UserDto.from(user));
    }
}
```

### `dashboard/auth/AuthController.java`

```java
package dashboard.auth;

import dashboard.auth.dto.AuthResponse;
import dashboard.auth.dto.LoginRequest;
import dashboard.auth.dto.RegisterRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/register")
    @ResponseStatus(HttpStatus.CREATED)
    public AuthResponse register(@Valid @RequestBody RegisterRequest request) {
        return authService.register(request);
    }

    @PostMapping("/login")
    public AuthResponse login(@Valid @RequestBody LoginRequest request) {
        return authService.login(request);
    }
}
```

## 4. Assignment Files

Assignments should belong to a course and optionally have submissions by users. For your first version, keep it simple and connect assignment to user submissions.

### `dashboard/assignment/AssignmentStatus.java`

```java
package dashboard.assignment;

public enum AssignmentStatus {
    PENDING,
    IN_PROGRESS,
    COMPLETED,
    OVERDUE
}
```

### `dashboard/assignment/Assignment.java`

```java
package dashboard.assignment;

import jakarta.persistence.*;
import lombok.*;

import java.time.Instant;
import java.util.UUID;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "assignments")
public class Assignment {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(nullable = false, length = 180)
    private String title;

    @Column(nullable = false, length = 120)
    private String subject;

    @Column(length = 2000)
    private String description;

    @Column(length = 2000)
    private String learningContent;

    @Column(length = 2000)
    private String resources;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 30)
    private AssignmentStatus status;

    @Column(nullable = false)
    private Instant dueAt;

    @Column(length = 120)
    private String teacherName;

    @Column(nullable = false)
    private Instant createdAt;

    @Column(nullable = false)
    private Instant updatedAt;

    @PrePersist
    void onCreate() {
        Instant now = Instant.now();
        createdAt = now;
        updatedAt = now;
        if (status == null) status = AssignmentStatus.PENDING;
    }

    @PreUpdate
    void onUpdate() {
        updatedAt = Instant.now();
    }
}
```

### `dashboard/assignment/Submission.java`

```java
package dashboard.assignment;

import dashboard.user.User;
import jakarta.persistence.*;
import lombok.*;

import java.time.Instant;
import java.util.UUID;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "submissions")
public class Submission {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    private Assignment assignment;

    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    private User student;

    @Column(length = 4000)
    private String content;

    private String fileUrl;

    private Integer grade;

    @Column(length = 2000)
    private String feedback;

    @Column(nullable = false)
    private Instant submittedAt;

    @PrePersist
    void onCreate() {
        submittedAt = Instant.now();
    }
}
```

### `dashboard/assignment/AssignmentRepository.java`

```java
package dashboard.assignment;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface AssignmentRepository extends JpaRepository<Assignment, UUID> {
    List<Assignment> findByStatus(AssignmentStatus status);
    List<Assignment> findBySubjectContainingIgnoreCase(String subject);
}
```

### `dashboard/assignment/SubmissionRepository.java`

```java
package dashboard.assignment;

import dashboard.user.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface SubmissionRepository extends JpaRepository<Submission, UUID> {
    Optional<Submission> findByAssignmentIdAndStudent(UUID assignmentId, User student);
}
```

### `dashboard/assignment/dto/AssignmentDTO.java`

```java
package dashboard.assignment.dto;

import dashboard.assignment.Assignment;
import dashboard.assignment.AssignmentStatus;

import java.time.Instant;
import java.util.UUID;

public record AssignmentDTO(
        UUID id,
        String title,
        String subject,
        AssignmentStatus status,
        Instant dueAt,
        String teacherName
) {
    public static AssignmentDTO from(Assignment assignment) {
        return new AssignmentDTO(
                assignment.getId(),
                assignment.getTitle(),
                assignment.getSubject(),
                assignment.getStatus(),
                assignment.getDueAt(),
                assignment.getTeacherName()
        );
    }
}
```

### `dashboard/assignment/dto/AssignmentDetailDTO.java`

```java
package dashboard.assignment.dto;

import dashboard.assignment.Assignment;
import dashboard.assignment.AssignmentStatus;

import java.time.Instant;
import java.util.UUID;

public record AssignmentDetailDTO(
        UUID id,
        String title,
        String subject,
        String description,
        String learningContent,
        String resources,
        AssignmentStatus status,
        Instant dueAt,
        String teacherName
) {
    public static AssignmentDetailDTO from(Assignment assignment) {
        return new AssignmentDetailDTO(
                assignment.getId(),
                assignment.getTitle(),
                assignment.getSubject(),
                assignment.getDescription(),
                assignment.getLearningContent(),
                assignment.getResources(),
                assignment.getStatus(),
                assignment.getDueAt(),
                assignment.getTeacherName()
        );
    }
}
```

### `dashboard/assignment/dto/CreateAssignmentRequest.java`

```java
package dashboard.assignment.dto;

import dashboard.assignment.AssignmentStatus;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.time.Instant;

public record CreateAssignmentRequest(
        @NotBlank String title,
        @NotBlank String subject,
        String description,
        String learningContent,
        String resources,
        AssignmentStatus status,
        @NotNull Instant dueAt,
        String teacherName
) {
}
```

### `dashboard/assignment/dto/UpdateAssignmentRequest.java`

```java
package dashboard.assignment.dto;

import dashboard.assignment.AssignmentStatus;

import java.time.Instant;

public record UpdateAssignmentRequest(
        String title,
        String subject,
        String description,
        String learningContent,
        String resources,
        AssignmentStatus status,
        Instant dueAt,
        String teacherName
) {
}
```

### `dashboard/assignment/dto/SubmitAssignmentRequest.java`

```java
package dashboard.assignment.dto;

import jakarta.validation.constraints.NotBlank;

public record SubmitAssignmentRequest(
        @NotBlank String content,
        String fileUrl
) {
}
```

### `dashboard/assignment/AssignmentService.java`

```java
package dashboard.assignment;

import dashboard.assignment.dto.*;
import dashboard.user.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class AssignmentService {

    private final AssignmentRepository assignmentRepository;
    private final SubmissionRepository submissionRepository;

    public List<AssignmentDTO> getAssignments(AssignmentStatus status) {
        List<Assignment> assignments = status == null
                ? assignmentRepository.findAll()
                : assignmentRepository.findByStatus(status);

        return assignments.stream()
                .map(AssignmentDTO::from)
                .toList();
    }

    public AssignmentDetailDTO getAssignment(UUID id) {
        Assignment assignment = findAssignment(id);
        return AssignmentDetailDTO.from(assignment);
    }

    public AssignmentDTO createAssignment(CreateAssignmentRequest request) {
        Assignment assignment = Assignment.builder()
                .title(request.title())
                .subject(request.subject())
                .description(request.description())
                .learningContent(request.learningContent())
                .resources(request.resources())
                .status(request.status() == null ? AssignmentStatus.PENDING : request.status())
                .dueAt(request.dueAt())
                .teacherName(request.teacherName())
                .build();

        return AssignmentDTO.from(assignmentRepository.save(assignment));
    }

    public AssignmentDTO updateAssignment(UUID id, UpdateAssignmentRequest request) {
        Assignment assignment = findAssignment(id);

        if (request.title() != null) assignment.setTitle(request.title());
        if (request.subject() != null) assignment.setSubject(request.subject());
        if (request.description() != null) assignment.setDescription(request.description());
        if (request.learningContent() != null) assignment.setLearningContent(request.learningContent());
        if (request.resources() != null) assignment.setResources(request.resources());
        if (request.status() != null) assignment.setStatus(request.status());
        if (request.dueAt() != null) assignment.setDueAt(request.dueAt());
        if (request.teacherName() != null) assignment.setTeacherName(request.teacherName());

        return AssignmentDTO.from(assignmentRepository.save(assignment));
    }

    public void submitAssignment(UUID id, User student, SubmitAssignmentRequest request) {
        Assignment assignment = findAssignment(id);

        Submission submission = submissionRepository
                .findByAssignmentIdAndStudent(id, student)
                .orElseGet(() -> Submission.builder()
                        .assignment(assignment)
                        .student(student)
                        .build());

        submission.setContent(request.content());
        submission.setFileUrl(request.fileUrl());
        submissionRepository.save(submission);
    }

    public void deleteAssignment(UUID id) {
        assignmentRepository.delete(findAssignment(id));
    }

    private Assignment findAssignment(UUID id) {
        return assignmentRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Assignment not found"));
    }
}
```

### `dashboard/assignment/AssignmentController.java`

```java
package dashboard.assignment;

import dashboard.assignment.dto.*;
import dashboard.user.User;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class AssignmentController {

    private final AssignmentService assignmentService;

    @GetMapping("/me/assignments")
    public List<AssignmentDTO> getMyAssignments(
            @RequestParam(required = false) AssignmentStatus status
    ) {
        return assignmentService.getAssignments(status);
    }

    @GetMapping("/me/assignments/{id}")
    public AssignmentDetailDTO getAssignment(@PathVariable UUID id) {
        return assignmentService.getAssignment(id);
    }

    @PostMapping("/assignments")
    @ResponseStatus(HttpStatus.CREATED)
    public AssignmentDTO createAssignment(@Valid @RequestBody CreateAssignmentRequest request) {
        return assignmentService.createAssignment(request);
    }

    @PatchMapping("/assignments/{id}")
    public AssignmentDTO updateAssignment(
            @PathVariable UUID id,
            @RequestBody UpdateAssignmentRequest request
    ) {
        return assignmentService.updateAssignment(id, request);
    }

    @PostMapping("/me/assignments/{id}/submissions")
    @ResponseStatus(HttpStatus.CREATED)
    public void submitAssignment(
            @PathVariable UUID id,
            @AuthenticationPrincipal User student,
            @Valid @RequestBody SubmitAssignmentRequest request
    ) {
        assignmentService.submitAssignment(id, student, request);
    }

    @DeleteMapping("/assignments/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteAssignment(@PathVariable UUID id) {
        assignmentService.deleteAssignment(id);
    }
}
```

Frontend mapping:

- Assignment table calls `GET /api/me/assignments`.
- Drawer details call `GET /api/me/assignments/{id}`.
- Submit button calls `POST /api/me/assignments/{id}/submissions`.

## 5. Calendar Files

Your frontend uses `react-big-calendar`, so the API should return `start` and `end` fields.

### `dashboard/calendar/CalendarEvent.java`

```java
package dashboard.calendar;

import dashboard.user.User;
import jakarta.persistence.*;
import lombok.*;

import java.time.Instant;
import java.util.UUID;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "calendar_events")
public class CalendarEvent {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    private User user;

    @Column(nullable = false, length = 180)
    private String title;

    @Column(length = 1200)
    private String description;

    @Column(nullable = false)
    private Instant startAt;

    @Column(nullable = false)
    private Instant endAt;

    @Column(length = 40)
    private String color;

    @Column(nullable = false)
    private Instant createdAt;

    @Column(nullable = false)
    private Instant updatedAt;

    @PrePersist
    void onCreate() {
        Instant now = Instant.now();
        createdAt = now;
        updatedAt = now;
    }

    @PreUpdate
    void onUpdate() {
        updatedAt = Instant.now();
    }
}
```

### `dashboard/calendar/CalendarEventRepository.java`

```java
package dashboard.calendar;

import dashboard.user.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.Instant;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface CalendarEventRepository extends JpaRepository<CalendarEvent, UUID> {
    List<CalendarEvent> findByUserOrderByStartAtAsc(User user);

    List<CalendarEvent> findByUserAndStartAtBetweenOrderByStartAtAsc(
            User user,
            Instant from,
            Instant to
    );

    Optional<CalendarEvent> findByIdAndUser(UUID id, User user);
}
```

    ### `dashboard/calendar/dto/CalendarEventDTO.java`

    ```java
    package dashboard.calendar.dto;

    import dashboard.calendar.CalendarEvent;

    import java.time.Instant;
    import java.util.UUID;

    public record CalendarEventDTO(
            UUID id,
            String title,
            String description,
            Instant start,
            Instant end,
            String color
    ) {
        public static CalendarEventDTO from(CalendarEvent event) {
            return new CalendarEventDTO(
                    event.getId(),
                    event.getTitle(),
                    event.getDescription(),
                    event.getStartAt(),
                    event.getEndAt(),
                    event.getColor()
            );
        }
    }
    ```

### `dashboard/calendar/dto/CreateCalendarEventRequest.java`

```java
package dashboard.calendar.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.time.Instant;

public record CreateCalendarEventRequest(
        @NotBlank String title,
        String description,
        @NotNull Instant start,
        @NotNull Instant end,
        String color
) {
}
```

### `dashboard/calendar/dto/UpdateCalendarEventRequest.java`

```java
package dashboard.calendar.dto;

import java.time.Instant;

public record UpdateCalendarEventRequest(
        String title,
        String description,
        Instant start,
        Instant end,
        String color
) {
}
```

### `dashboard/calendar/CalendarEventService.java`

```java
package dashboard.calendar;

import dashboard.calendar.dto.CalendarEventDTO;
import dashboard.calendar.dto.CreateCalendarEventRequest;
import dashboard.calendar.dto.UpdateCalendarEventRequest;
import dashboard.user.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class CalendarEventService {

    private final CalendarEventRepository calendarEventRepository;

    public List<CalendarEventDTO> getEvents(User user, Instant from, Instant to) {
        List<CalendarEvent> events;

        if (from != null && to != null) {
            events = calendarEventRepository.findByUserAndStartAtBetweenOrderByStartAtAsc(user, from, to);
        } else {
            events = calendarEventRepository.findByUserOrderByStartAtAsc(user);
        }

        return events.stream()
                .map(CalendarEventDTO::from)
                .toList();
    }

    public CalendarEventDTO createEvent(User user, CreateCalendarEventRequest request) {
        validateRange(request.start(), request.end());

        CalendarEvent event = CalendarEvent.builder()
                .user(user)
                .title(request.title())
                .description(request.description())
                .startAt(request.start())
                .endAt(request.end())
                .color(request.color() == null ? "#4f46e5" : request.color())
                .build();

        return CalendarEventDTO.from(calendarEventRepository.save(event));
    }

    public CalendarEventDTO updateEvent(User user, UUID id, UpdateCalendarEventRequest request) {
        CalendarEvent event = findOwnedEvent(user, id);

        Instant nextStart = request.start() == null ? event.getStartAt() : request.start();
        Instant nextEnd = request.end() == null ? event.getEndAt() : request.end();
        validateRange(nextStart, nextEnd);

        if (request.title() != null) event.setTitle(request.title());
        if (request.description() != null) event.setDescription(request.description());
        if (request.start() != null) event.setStartAt(request.start());
        if (request.end() != null) event.setEndAt(request.end());
        if (request.color() != null) event.setColor(request.color());

        return CalendarEventDTO.from(calendarEventRepository.save(event));
    }

    public void deleteEvent(User user, UUID id) {
        CalendarEvent event = findOwnedEvent(user, id);
        calendarEventRepository.delete(event);
    }

    private CalendarEvent findOwnedEvent(User user, UUID id) {
        return calendarEventRepository.findByIdAndUser(id, user)
                .orElseThrow(() -> new IllegalArgumentException("Calendar event not found"));
    }

    private void validateRange(Instant start, Instant end) {
        if (start == null || end == null || !end.isAfter(start)) {
            throw new IllegalArgumentException("Event end must be after start");
        }
    }
}
```

### `dashboard/calendar/CalendarEventController.java`

```java
package dashboard.calendar;

import dashboard.calendar.dto.CalendarEventDTO;
import dashboard.calendar.dto.CreateCalendarEventRequest;
import dashboard.calendar.dto.UpdateCalendarEventRequest;
import dashboard.user.User;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/me/calendar-events")
@RequiredArgsConstructor
public class CalendarEventController {

    private final CalendarEventService calendarEventService;

    @GetMapping
    public List<CalendarEventDTO> getEvents(
            @AuthenticationPrincipal User user,
            @RequestParam(required = false) Instant from,
            @RequestParam(required = false) Instant to
    ) {
        return calendarEventService.getEvents(user, from, to);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public CalendarEventDTO createEvent(
            @AuthenticationPrincipal User user,
            @Valid @RequestBody CreateCalendarEventRequest request
    ) {
        return calendarEventService.createEvent(user, request);
    }

    @PatchMapping("/{id}")
    public CalendarEventDTO updateEvent(
            @AuthenticationPrincipal User user,
            @PathVariable UUID id,
            @RequestBody UpdateCalendarEventRequest request
    ) {
        return calendarEventService.updateEvent(user, id, request);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteEvent(
            @AuthenticationPrincipal User user,
            @PathVariable UUID id
    ) {
        calendarEventService.deleteEvent(user, id);
    }
}
```

Frontend mapping:

- Load events: `GET /api/me/calendar-events`
- Create event: `POST /api/me/calendar-events`
- Edit event: `PATCH /api/me/calendar-events/{id}`
- Delete event: `DELETE /api/me/calendar-events/{id}`

## 6. Common Error Handling

Your service code above throws `IllegalArgumentException`. That works, but the frontend gets cleaner errors if you add this handler.

### `dashboard/common/Exception/GlobalExceptionHandler.java`

Your package folder is currently named `Exception` with uppercase `E`. Java convention is lowercase, but if you keep the folder, use this package:

```java
package dashboard.common.Exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.time.Instant;
import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<Map<String, Object>> handleBadRequest(IllegalArgumentException ex) {
        return build(HttpStatus.BAD_REQUEST, ex.getMessage());
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String, Object>> handleValidation(MethodArgumentNotValidException ex) {
        Map<String, String> fields = new HashMap<>();
        ex.getBindingResult().getFieldErrors().forEach(error ->
                fields.put(error.getField(), error.getDefaultMessage())
        );

        Map<String, Object> body = new HashMap<>();
        body.put("status", 400);
        body.put("message", "Validation failed");
        body.put("validationErrors", fields);
        body.put("timestamp", Instant.now());

        return ResponseEntity.badRequest().body(body);
    }

    private ResponseEntity<Map<String, Object>> build(HttpStatus status, String message) {
        Map<String, Object> body = new HashMap<>();
        body.put("status", status.value());
        body.put("message", message);
        body.put("timestamp", Instant.now());
        return ResponseEntity.status(status).body(body);
    }
}
```

## 7. How To Test With Postman Or Thunder Client

### Register

```http
POST http://localhost:8080/api/auth/register
Content-Type: application/json
```

```json
{
  "email": "student@example.com",
  "password": "12345678",
  "firstName": "Student",
  "lastName": "One",
  "role": "STUDENT"
}
```

### Login

```http
POST http://localhost:8080/api/auth/login
Content-Type: application/json
```

```json
{
  "email": "student@example.com",
  "password": "12345678"
}
```

Copy `accessToken`.

### Create Calendar Event

```http
POST http://localhost:8080/api/me/calendar-events
Authorization: Bearer YOUR_TOKEN
Content-Type: application/json
```

```json
{
  "title": "Math review",
  "description": "Study algebra unit",
  "start": "2026-08-15T10:00:00Z",
  "end": "2026-08-15T11:00:00Z",
  "color": "#4f46e5"
}
```

### Create Assignment

```http
POST http://localhost:8080/api/assignments
Authorization: Bearer YOUR_TOKEN
Content-Type: application/json
```

```json
{
  "title": "Mathematics",
  "subject": "Algebra Unit 1",
  "description": "Solve the first algebra practice set.",
  "learningContent": "Review equations, variables, and balancing.",
  "resources": "Textbook pages 10-20",
  "status": "PENDING",
  "dueAt": "2026-08-20T23:10:00Z",
  "teacherName": "Mr. Kamal"
}
```

### Get Assignments

```http
GET http://localhost:8080/api/me/assignments
Authorization: Bearer YOUR_TOKEN
```

### Submit Assignment

```http
POST http://localhost:8080/api/me/assignments/ASSIGNMENT_ID/submissions
Authorization: Bearer YOUR_TOKEN
Content-Type: application/json
```

```json
{
  "content": "My answer is attached here.",
  "fileUrl": null
}
```

## 8. Frontend Changes Later

### Axios

File:

```text
frontend/src/Components/api/axios.jsx
```

Use:

```js
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/api",
  withCredentials: false,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
```

### AuthContext

Change login from fetching `/users` to:

```js
const { data } = await axios.post("/auth/login", info);
localStorage.setItem("accessToken", data.accessToken);
setCurrentUser(data.user);
navigate("/dashboard");
```

Change register to:

```js
const { data } = await axios.post("/auth/register", payload);
localStorage.setItem("accessToken", data.accessToken);
setCurrentUser(data.user);
navigate("/dashboard");
```

## 9. Best Implementation Order

1. Add missing Maven dependencies.
2. Configure `application.properties`.
3. Implement `User`, `UserRole`, `UserRepository`, `UserDto`.
4. Implement `JwtService`, `JwtAuthenticationFilter`, `SecurityConfig`.
5. Implement auth DTOs, `AuthService`, `AuthController`.
6. Run and test register/login.
7. Implement calendar files.
8. Test calendar CRUD with JWT.
9. Implement assignment files.
10. Test assignment create/list/detail/submit with JWT.

Do auth first. Once JWT works, assignment and calendar become much easier because every request can use `@AuthenticationPrincipal User user`.
