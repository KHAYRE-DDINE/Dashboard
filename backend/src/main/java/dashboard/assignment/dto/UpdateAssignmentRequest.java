package dashboard.assignment.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UpdateAssignmentRequest {
    private String title;
    private String subject;
    private String description;
    private String status;
    private String date;
    private String time;
    private String color;
}
