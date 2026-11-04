package dashboard.classroom.dto;

import dashboard.classroom.Classroom;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ClassroomDTO {
    private Long id;
    private String title;
    private String subject;
    private String instructor;
    private String teacher;
    private String joinCode;
    private String room;
    private String time;
    private String date;
    private String status;
    private int memberCount;

    public static ClassroomDTO fromEntity(Classroom classroom) {
        if (classroom == null) return null;
        return ClassroomDTO.builder()
                .id(classroom.getId())
                .title(classroom.getTitle())
                .subject(classroom.getSubject())
                .instructor(classroom.getInstructor())
                .teacher(classroom.getInstructor())
                .joinCode(classroom.getJoinCode())
                .room(classroom.getRoom())
                .time(classroom.getTime())
                .date(classroom.getDate())
                .status(classroom.getStatus())
                .memberCount(classroom.getMemberships() != null ? classroom.getMemberships().size() : 0)
                .build();
    }
}
