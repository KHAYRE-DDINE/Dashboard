package dashboard.assignment;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.Instant;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.UUID;


@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "assignments")
public class Assignment {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(nullable = false, length = 255)
    private String title;

    @Column(nullable = false, length = 500)
    private String images;

    @Column(length = 455)
    private String description;

    @Column(length = 455)
    private String learningContent;

    @Column(nullable = false, length = 255)
    private String teacherName;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 30)
    private AssignmentStatus status;

    @Column(nullable = false)
    private Date deadline;

    @Column(nullable = false)
    private Instant createdAt;

    @Column(nullable = false)
    private Instant updateAt;


    @PrePersist
    void onCreate(){
        Instant now = Instant.now();
        createdAt = now;
        updateAt = now;

        if (status == null) status = AssignmentStatus.PENDING;
    }

    @PreUpdate
    void onUpdate(){
        updateAt = Instant.now();
    }
}
