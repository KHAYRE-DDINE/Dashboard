package dashboard.user.dto;

import dashboard.user.User;
import dashboard.user.UserRole;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Builder
public class UserResponseDto {
    private String first_name;
    private String last_name;
    private String email;
    private String courses;
    private String colleagues;
    private String stats;
    private String badges;
    private UserRole role;

    public static UserResponseDto toResponseDto(User user) {

        return UserResponseDto.builder()
                .email(user.getEmail())
                .first_name(user.getFirst_name())
                .last_name(user.getLast_name())
                .role(user.getRole())
                .stats(user.getStats())
                .badges(user.getBadges())
                .colleagues(user.getColleagues())
                .courses(user.getCourses())
                .build();
    }
}
