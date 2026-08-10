package dashboard.user;


import dashboard.user.dto.UserRequestDto;
import dashboard.user.dto.UserResponseDto;
import jakarta.validation.Valid;
import lombok.Builder;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

import static dashboard.user.dto.UserResponseDto.toResponseDto;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;
    private final PasswordEncoder passwordEncoder;

    @GetMapping
    public List<UserResponseDto> getAllUsers() {
        List<User> users = userService.getAll();

        return users.stream()
                .map(UserResponseDto::toResponseDto)
                .collect(Collectors.toList());
    }

    @GetMapping("/{id}")
    public UserResponseDto getUserById(@PathVariable UUID id) {

        User existingUser = userService.getById(id);


        return toResponseDto(existingUser);
    }

    @PostMapping("/create")
    public ResponseEntity<UserResponseDto> createUser(@Valid @RequestBody UserRequestDto user) {
        User userEntity = toEntity(user);

        userService.addUser(userEntity);

        UserResponseDto userDto = toResponseDto(userEntity);

        return ResponseEntity.ok(userDto);
    }

    @PutMapping("/{id}/update")
    public ResponseEntity<UserResponseDto> updateUser(@PathVariable UUID id, @Valid @RequestBody UserRequestDto user) {
        User entity = toEntity(user);

        userService.updateUser(id, entity);

        return ResponseEntity.status(HttpStatus.CREATED).body(toResponseDto(entity));
    }

    public User toEntity(UserRequestDto userDto) {
        User createNewUser = new User();

        createNewUser.setId(UUID.randomUUID());
        createNewUser.setFirst_name(userDto.getFirst_name());
        createNewUser.setLast_name(userDto.getLast_name());
        createNewUser.setEmail(userDto.getEmail());
        createNewUser.setPassword(passwordEncoder.encode(userDto.getPassword()));
        createNewUser.setRole(userDto.getRole());
        createNewUser.setCourses(userDto.getCourses());
        createNewUser.setColleagues(userDto.getColleagues());
        createNewUser.setStats(userDto.getStats());

        return createNewUser;
    }

}
