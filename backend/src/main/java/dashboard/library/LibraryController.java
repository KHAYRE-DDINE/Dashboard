package dashboard.library;

import dashboard.common.ApiResponse;
import dashboard.library.dto.CreateLibraryItemRequest;
import dashboard.library.dto.LibraryItemDTO;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping({"/api/v1/library", "/library"})
@Tag(name = "Library", description = "Digital books, textbooks, and reading materials")
public class LibraryController {

    private final LibraryService libraryService;

    public LibraryController(LibraryService libraryService) {
        this.libraryService = libraryService;
    }

    @GetMapping
    @Operation(summary = "Get library items by category and query")
    public List<LibraryItemDTO> getItems(@RequestParam(required = false) String category,
                                         @RequestParam(required = false) String query) {
        return libraryService.getItems(category, query);
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get library item by ID")
    public LibraryItemDTO getItemById(@PathVariable Long id) {
        return libraryService.getItemById(id);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    @Operation(summary = "Add new book to library")
    public LibraryItemDTO createItem(@Valid @RequestBody CreateLibraryItemRequest request) {
        return libraryService.createItem(request);
    }

    @PostMapping("/{id}/download")
    @Operation(summary = "Record book download")
    public ResponseEntity<ApiResponse<String>> downloadBook(@PathVariable Long id) {
        libraryService.incrementDownloadCount(id);
        return ResponseEntity.ok(ApiResponse.success("Download recorded"));
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Delete library book")
    public ResponseEntity<ApiResponse<String>> deleteItem(@PathVariable Long id) {
        libraryService.deleteItem(id);
        return ResponseEntity.ok(ApiResponse.success("Item deleted successfully"));
    }
}
