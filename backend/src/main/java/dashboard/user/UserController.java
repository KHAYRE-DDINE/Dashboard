package dashboard.user;


import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/user")
public class UserController {

    private UserService userService;

    public UserController (UserService userService){
        this.userService = userService;
    }

    @GetMapping
    public List<User> getAllUsers() {
        return userService.getAll();
    }

    @GetMapping("/{id}")
    public User getUSerById(@PathVariable UUID id){
        return userService.getById(id);
    }

    @PostMapping("/create")
    public User createUser(@Valid @RequestBody User user){
        return userService.addUser(user).getBody();
    }

    @PutMapping("/{id}/update")
    public User updateUser(@PathVariable  UUID id, @Valid @RequestBody User user){
        return userService.updateUser(id, user).getBody();
    }
}
