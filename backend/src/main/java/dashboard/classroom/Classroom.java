package dashboard.classroom;

import dashboard.user.User;
import jakarta.persistence.*;
import lombok.*;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "classes")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Classroom {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private String subject;

    @Column(nullable = false)
    private String instructor;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "instructor_id")
    private User instructorUser;

    @Column(name = "join_code", nullable = false, unique = true, length = 20)
    private String joinCode;

    private String room;
    private String time;
    private String date;

    @Builder.Default
    private String status = "Active";

    @OneToMany(mappedBy = "classroom", cascade = CascadeType.ALL, orphanRemoval = true)
    @Builder.Default
    private List<ClassMembership> memberships = new ArrayList<>();

    @Builder.Default
    @Column(name = "created_at")
    private Instant createdAt = Instant.now();
}
