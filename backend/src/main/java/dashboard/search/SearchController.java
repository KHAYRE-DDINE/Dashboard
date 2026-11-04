package dashboard.search;

import dashboard.search.dto.SearchResultDTO;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping({"/api/v1/search", "/search"})
@Tag(name = "Search", description = "Global federated search across courses, assignments, classes, and library")
public class SearchController {

    private final SearchService searchService;

    public SearchController(SearchService searchService) {
        this.searchService = searchService;
    }

    @GetMapping
    @Operation(summary = "Search all platform resources")
    public List<SearchResultDTO> search(@RequestParam(value = "q", required = false) String query) {
        return searchService.search(query);
    }
}
