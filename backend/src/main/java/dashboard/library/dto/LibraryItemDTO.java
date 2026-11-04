package dashboard.library.dto;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import dashboard.library.LibraryItem;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class LibraryItemDTO {
    private Long id;
    private String title;
    private String author;
    private String category;
    private String format;
    private String size;
    private String image;
    private String color;
    private String description;
    @Builder.Default
    private List<String> toc = new ArrayList<>();
    private int downloadCount;

    private static final ObjectMapper MAPPER = new ObjectMapper();

    public static LibraryItemDTO fromEntity(LibraryItem item) {
        if (item == null) return null;
        List<String> parsedToc = new ArrayList<>();
        if (item.getToc() != null && !item.getToc().isBlank()) {
            try {
                parsedToc = MAPPER.readValue(item.getToc(), new TypeReference<List<String>>() {});
            } catch (Exception e) {
                parsedToc.add(item.getToc());
            }
        }

        return LibraryItemDTO.builder()
                .id(item.getId())
                .title(item.getTitle())
                .author(item.getAuthor())
                .category(item.getCategory())
                .format(item.getFormat())
                .size(item.getSize())
                .image(item.getImageUrl())
                .color(item.getColor())
                .description(item.getDescription())
                .toc(parsedToc)
                .downloadCount(item.getDownloadCount())
                .build();
    }
}
