package dashboard.user;


import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class UserService {
    private UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public List<User> getAll(){
       return userRepository.findAll();
    }

    public User getById(@PathVariable UUID id){
        return userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found with id" + id));
    }

    public ResponseEntity<User> addUser( User user){
        return ResponseEntity.ok(userRepository.save(user));
    }

    public ResponseEntity<User> updateUser( UUID id , User user){
        Optional<User> existingUser = userRepository.findById(id);

        if(!existingUser.isPresent()){
            return ResponseEntity.notFound().build();
        }

        User existUser = existingUser.get();

        existUser.setEmail(user.getEmail());
        existUser.setBadges(user.getBadges());
        existUser.setColleagues(user.getColleagues());
        existUser.setFirst_name(user.getFirst_name());
        existUser.setLast_name(user.getLast_name());
        existUser.setCourses(user.getCourses());
        existUser.setRole(user.getRole());
        existUser.setPassword(user.getPassword());
        existUser.setStats(user.getStats());


        User updatedUser = userRepository.save(existUser);

        return ResponseEntity.ok(updatedUser);
    }
}
