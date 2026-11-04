package dashboard.user;

import com.fasterxml.jackson.databind.ObjectMapper;
import dashboard.common.BadRequestException;
import dashboard.common.ResourceNotFoundException;
import dashboard.user.dto.UpdatePasswordRequest;
import dashboard.user.dto.UpdatePreferencesRequest;
import dashboard.user.dto.UpdateProfileRequest;
import dashboard.user.dto.UserResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Map;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final ObjectMapper objectMapper;

    @Transactional(readOnly = true)
    public UserResponseDto getUserById(UUID id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + id));
        return UserResponseDto.fromEntity(user);
    }

    @Transactional(readOnly = true)
    public UserResponseDto getUserByEmail(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with email: " + email));
        return UserResponseDto.fromEntity(user);
    }

    @Transactional
    public UserResponseDto updateProfile(UUID userId, UpdateProfileRequest request) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + userId));

        user.setFirstName(request.getFirstName().trim());
        user.setLastName(request.getLastName().trim());
        if (request.getPhone() != null) user.setPhone(request.getPhone().trim());
        if (request.getBio() != null) user.setBio(request.getBio().trim());
        if (request.getLocation() != null) user.setLocation(request.getLocation().trim());
        if (request.getTitle() != null) user.setTitle(request.getTitle().trim());
        if (request.getLanguage() != null) user.setLanguage(request.getLanguage().trim());

        return UserResponseDto.fromEntity(userRepository.save(user));
    }

    @Transactional
    public UserResponseDto patchUser(UUID userId, Map<String, Object> fields) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + userId));

        if (fields.containsKey("firstName")) {
            user.setFirstName(String.valueOf(fields.get("firstName")).trim());
        } else if (fields.containsKey("first name")) {
            user.setFirstName(String.valueOf(fields.get("first name")).trim());
        }

        if (fields.containsKey("lastName")) {
            user.setLastName(String.valueOf(fields.get("lastName")).trim());
        } else if (fields.containsKey("last name")) {
            user.setLastName(String.valueOf(fields.get("last name")).trim());
        }

        if (fields.containsKey("phone") && fields.get("phone") != null) {
            user.setPhone(String.valueOf(fields.get("phone")).trim());
        }
        if (fields.containsKey("bio") && fields.get("bio") != null) {
            user.setBio(String.valueOf(fields.get("bio")).trim());
        }
        if (fields.containsKey("location") && fields.get("location") != null) {
            user.setLocation(String.valueOf(fields.get("location")).trim());
        }
        if (fields.containsKey("title") && fields.get("title") != null) {
            user.setTitle(String.valueOf(fields.get("title")).trim());
        }
        if (fields.containsKey("language") && fields.get("language") != null) {
            user.setLanguage(String.valueOf(fields.get("language")).trim());
        }
        if (fields.containsKey("avatar") && fields.get("avatar") != null) {
            user.setAvatar(String.valueOf(fields.get("avatar")));
        }
        if (fields.containsKey("isDarkMode")) {
            Object dm = fields.get("isDarkMode");
            if (dm instanceof Boolean) {
                user.setDarkMode((Boolean) dm);
            } else if (dm != null) {
                user.setDarkMode(Boolean.parseBoolean(String.valueOf(dm)));
            }
        } else if (fields.containsKey("darkMode")) {
            Object dm = fields.get("darkMode");
            if (dm instanceof Boolean) {
                user.setDarkMode((Boolean) dm);
            } else if (dm != null) {
                user.setDarkMode(Boolean.parseBoolean(String.valueOf(dm)));
            }
        }
        if (fields.containsKey("preferences")) {
            Object prefObj = fields.get("preferences");
            if (prefObj instanceof String) {
                user.setPreferences((String) prefObj);
            } else if (prefObj != null) {
                try {
                    user.setPreferences(objectMapper.writeValueAsString(prefObj));
                } catch (Exception ignored) {
                }
            }
        }

        return UserResponseDto.fromEntity(userRepository.save(user));
    }

    @Transactional
    public UserResponseDto updatePreferences(UUID userId, UpdatePreferencesRequest request) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + userId));

        if (request.getPreferences() != null) {
            user.setPreferences(request.getPreferences());
        }
        if (request.getIsDarkMode() != null) {
            user.setDarkMode(request.getIsDarkMode());
        }

        return UserResponseDto.fromEntity(userRepository.save(user));
    }

    @Transactional
    public UserResponseDto updateAvatar(UUID userId, String avatarUrl) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + userId));

        user.setAvatar(avatarUrl);
        return UserResponseDto.fromEntity(userRepository.save(user));
    }

    @Transactional
    public void updatePassword(UUID userId, UpdatePasswordRequest request) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + userId));

        if (!passwordEncoder.matches(request.getCurrentPassword(), user.getPassword())) {
            throw new BadRequestException("Current password does not match our records.");
        }

        user.setPassword(passwordEncoder.encode(request.getNewPassword()));
        userRepository.save(user);
    }

    @Transactional
    public void deleteAccount(UUID userId) {
        if (!userRepository.existsById(userId)) {
            throw new ResourceNotFoundException("User not found with id: " + userId);
        }
        userRepository.deleteById(userId);
    }
}
