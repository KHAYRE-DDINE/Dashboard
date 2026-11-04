package dashboard.auth;

import dashboard.auth.dto.AuthResponse;
import dashboard.auth.dto.LoginRequest;
import dashboard.auth.dto.RegisterRequest;
import dashboard.common.ApiResponse;
import dashboard.user.User;
import dashboard.user.dto.UserResponseDto;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<ApiResponse<AuthResponse>> register(@Valid @RequestBody RegisterRequest request) {
        AuthResponse response = authService.register(request);
        return ResponseEntity.ok(ApiResponse.ok("Registration successful.", response));
    }

    @PostMapping("/login")
    public ResponseEntity<ApiResponse<AuthResponse>> login(@Valid @RequestBody LoginRequest request) {
        AuthResponse response = authService.login(request);
        return ResponseEntity.ok(ApiResponse.ok("Login successful.", response));
    }

    @GetMapping("/me")
    public ResponseEntity<ApiResponse<UserResponseDto>> getAuthenticatedUser(@AuthenticationPrincipal User currentUser) {
        return ResponseEntity.ok(ApiResponse.ok(UserResponseDto.fromEntity(currentUser)));
    }
}
