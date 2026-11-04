package dashboard.search.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class SearchResultDTO {
    private String type; // COURSE, ASSIGNMENT, CLASS, LIBRARY
    private Long id;
    private String title;
    private String subtitle;
    private String link;
    private String icon;
}
