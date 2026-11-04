package dashboard.library;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LibraryRepository extends JpaRepository<LibraryItem, Long> {
    List<LibraryItem> findByCategoryIgnoreCase(String category);

    @Query("SELECT l FROM LibraryItem l WHERE LOWER(l.title) LIKE LOWER(CONCAT('%', :query, '%')) OR LOWER(l.author) LIKE LOWER(CONCAT('%', :query, '%')) OR LOWER(l.category) LIKE LOWER(CONCAT('%', :query, '%'))")
    List<LibraryItem> searchLibrary(String query);
}
