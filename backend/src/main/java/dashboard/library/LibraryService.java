package dashboard.library;

import com.fasterxml.jackson.databind.ObjectMapper;
import dashboard.common.ResourceNotFoundException;
import dashboard.library.dto.CreateLibraryItemRequest;
import dashboard.library.dto.LibraryItemDTO;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class LibraryService {

    private final LibraryRepository libraryRepository;
    private static final ObjectMapper MAPPER = new ObjectMapper();

    public LibraryService(LibraryRepository libraryRepository) {
        this.libraryRepository = libraryRepository;
    }

    @Transactional(readOnly = true)
    public List<LibraryItemDTO> getItems(String category, String query) {
        List<LibraryItem> items;
        if (query != null && !query.trim().isEmpty()) {
            items = libraryRepository.searchLibrary(query.trim());
        } else if (category != null && !category.trim().isEmpty() && !category.equalsIgnoreCase("all")) {
            items = libraryRepository.findByCategoryIgnoreCase(category.trim());
        } else {
            items = libraryRepository.findAll();
        }

        return items.stream().map(LibraryItemDTO::fromEntity).collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public LibraryItemDTO getItemById(Long id) {
        LibraryItem item = libraryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Library item not found with id: " + id));
        return LibraryItemDTO.fromEntity(item);
    }

    public LibraryItemDTO createItem(CreateLibraryItemRequest request) {
        String tocJson = "[]";
        if (request.getToc() != null && !request.getToc().isEmpty()) {
            try {
                tocJson = MAPPER.writeValueAsString(request.getToc());
            } catch (Exception ignored) {
            }
        }

        LibraryItem item = LibraryItem.builder()
                .title(request.getTitle())
                .author(request.getAuthor())
                .category(request.getCategory())
                .format(request.getFormat() != null ? request.getFormat() : "PDF")
                .size(request.getSize() != null ? request.getSize() : "10 MB")
                .imageUrl(request.getImage())
                .color(request.getColor() != null ? request.getColor() : "bg-indigo-50 text-indigo-700")
                .description(request.getDescription())
                .toc(tocJson)
                .downloadCount(0)
                .createdAt(Instant.now())
                .build();

        LibraryItem saved = libraryRepository.save(item);
        return LibraryItemDTO.fromEntity(saved);
    }

    public void incrementDownloadCount(Long id) {
        LibraryItem item = libraryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Library item not found with id: " + id));
        item.setDownloadCount(item.getDownloadCount() + 1);
        libraryRepository.save(item);
    }

    public void deleteItem(Long id) {
        if (!libraryRepository.existsById(id)) {
            throw new ResourceNotFoundException("Library item not found with id: " + id);
        }
        libraryRepository.deleteById(id);
    }
}
