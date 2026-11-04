package dashboard.library;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import java.time.Instant;

@Entity
@Table(name = "library_items")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class LibraryItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private String author;

    @Column(nullable = false, length = 100)
    private String category;

    @Builder.Default
    @Column(length = 20)
    private String format = "PDF";

    @Column(length = 50)
    private String size;

    @Column(name = "image_url", length = 500)
    private String imageUrl;

    @Column(name = "file_path", length = 500)
    private String filePath;

    @Builder.Default
    @Column(length = 50)
    private String color = "bg-indigo-50 text-indigo-700";

    @Column(columnDefinition = "TEXT")
    private String description;

    @JdbcTypeCode(SqlTypes.JSON)
    @Column(name = "toc", columnDefinition = "jsonb")
    private String toc;

    @Builder.Default
    @Column(name = "download_count")
    private int downloadCount = 0;

    @Builder.Default
    @Column(name = "created_at")
    private Instant createdAt = Instant.now();
}
