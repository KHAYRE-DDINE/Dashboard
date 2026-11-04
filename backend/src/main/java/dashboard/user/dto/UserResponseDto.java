package dashboard.user.dto;

import dashboard.user.User;
import dashboard.user.UserRole;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserResponseDto {
    private UUID id;
    private String email;
    private String firstName;
    private String lastName;
    private String phone;
    private String bio;
    private String location;
    private String title;
    private String language;
    private String avatar;
    private UserRole role;
    private boolean isDarkMode;
    private String preferences;

    public static UserResponseDto fromEntity(User user) {
        if (user == null) return null;
        return UserResponseDto.builder()
                .id(user.getId())
                .email(user.getEmail())
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .phone(user.getPhone())
                .bio(user.getBio())
                .location(user.getLocation())
                .title(user.getTitle())
                .language(user.getLanguage())
                .avatar(user.getAvatar())
                .role(user.getRole())
                .isDarkMode(user.isDarkMode())
                .preferences(user.getPreferences())
                .build();
    }
}
