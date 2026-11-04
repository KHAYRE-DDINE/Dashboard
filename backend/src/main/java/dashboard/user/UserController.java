package dashboard.user;

import dashboard.common.ApiResponse;
import dashboard.user.dto.UpdatePasswordRequest;
import dashboard.user.dto.UpdatePreferencesRequest;
import dashboard.user.dto.UpdateProfileRequest;
import dashboard.user.dto.UserResponseDto;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping({"/api/v1/users", "/users"})
@Tag(name = "Users", description = "User profile and preferences management")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping("/me")
    @Operation(summary = "Get current authenticated user")
    public ResponseEntity<ApiResponse<UserResponseDto>> getCurrentUser(@AuthenticationPrincipal User currentUser) {
        UserResponseDto userDto = userService.getUserById(currentUser.getId());
        return ResponseEntity.ok(ApiResponse.ok(userDto));
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get user by ID")
    public ResponseEntity<ApiResponse<UserResponseDto>> getUserById(
            @AuthenticationPrincipal User currentUser,
            @PathVariable String id
    ) {
        UUID targetId;
        if ("me".equalsIgnoreCase(id) && currentUser != null) {
            targetId = currentUser.getId();
        } else {
            try {
                targetId = UUID.fromString(id);
            } catch (IllegalArgumentException e) {
                targetId = currentUser != null ? currentUser.getId() : null;
            }
        }

        if (targetId == null) {
            return ResponseEntity.badRequest().body(ApiResponse.error("Invalid user identifier."));
        }

        UserResponseDto userDto = userService.getUserById(targetId);
        return ResponseEntity.ok(ApiResponse.ok(userDto));
    }

    @PatchMapping("/me")
    @Operation(summary = "Patch current authenticated user")
    public ResponseEntity<ApiResponse<UserResponseDto>> patchCurrentUser(
            @AuthenticationPrincipal User currentUser,
            @RequestBody Map<String, Object> fields
    ) {
        UserResponseDto updated = userService.patchUser(currentUser.getId(), fields);
        return ResponseEntity.ok(ApiResponse.ok("User updated successfully.", updated));
    }

    @PatchMapping("/{id}")
    @Operation(summary = "Patch user by ID or me")
    public ResponseEntity<ApiResponse<UserResponseDto>> patchUserById(
            @AuthenticationPrincipal User currentUser,
            @PathVariable String id,
            @RequestBody Map<String, Object> fields
    ) {
        UUID targetId;
        if ("me".equalsIgnoreCase(id) && currentUser != null) {
            targetId = currentUser.getId();
        } else {
            try {
                targetId = UUID.fromString(id);
            } catch (IllegalArgumentException e) {
                targetId = currentUser != null ? currentUser.getId() : null;
            }
        }

        if (targetId == null) {
            return ResponseEntity.badRequest().body(ApiResponse.error("Invalid user identifier."));
        }

        UserResponseDto updated = userService.patchUser(targetId, fields);
        return ResponseEntity.ok(ApiResponse.ok("User updated successfully.", updated));
    }

    @PutMapping("/profile")
    @Operation(summary = "Update user profile")
    public ResponseEntity<ApiResponse<UserResponseDto>> updateProfile(
            @AuthenticationPrincipal User currentUser,
            @Valid @RequestBody UpdateProfileRequest request
    ) {
        UserResponseDto updated = userService.updateProfile(currentUser.getId(), request);
        return ResponseEntity.ok(ApiResponse.ok("Profile updated successfully.", updated));
    }

    @PatchMapping("/preferences")
    @Operation(summary = "Update user preferences")
    public ResponseEntity<ApiResponse<UserResponseDto>> updatePreferences(
            @AuthenticationPrincipal User currentUser,
            @RequestBody UpdatePreferencesRequest request
    ) {
        UserResponseDto updated = userService.updatePreferences(currentUser.getId(), request);
        return ResponseEntity.ok(ApiResponse.ok("Preferences updated successfully.", updated));
    }

    @PatchMapping("/avatar")
    @Operation(summary = "Update user avatar")
    public ResponseEntity<ApiResponse<UserResponseDto>> updateAvatar(
            @AuthenticationPrincipal User currentUser,
            @RequestBody Map<String, String> payload
    ) {
        String avatarUrl = payload.get("avatar");
        UserResponseDto updated = userService.updateAvatar(currentUser.getId(), avatarUrl);
        return ResponseEntity.ok(ApiResponse.ok("Avatar updated successfully.", updated));
    }

    @PostMapping("/password")
    @Operation(summary = "Update account password")
    public ResponseEntity<ApiResponse<Void>> updatePassword(
            @AuthenticationPrincipal User currentUser,
            @Valid @RequestBody UpdatePasswordRequest request
    ) {
        userService.updatePassword(currentUser.getId(), request);
        return ResponseEntity.ok(ApiResponse.ok("Password updated successfully.", null));
    }

    @DeleteMapping("/me")
    @Operation(summary = "Delete account")
    public ResponseEntity<ApiResponse<Void>> deleteAccount(@AuthenticationPrincipal User currentUser) {
        userService.deleteAccount(currentUser.getId());
        return ResponseEntity.ok(ApiResponse.ok("Account deleted successfully.", null));
    }
}
