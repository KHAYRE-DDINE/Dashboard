package dashboard.user;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.Instant;
import java.util.UUID;

@Entity
@Table(name = "Users")
@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter

public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    private String first_name;

    private String last_name;

    private String email;

    private String password;

    private String courses;

    private String colleagues;

    private String stats;

    private String badges;

    @Enumerated(EnumType.STRING)
    private UserRole role;

    private Instant createAt;

    private Instant updateAt;

    @PrePersist
    void onCreate(){
        createAt = Instant.now();
    }

    @PreUpdate
    void onUpdate(){
        updateAt = Instant.now();
    }
}
