package dashboard.common;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;
import java.util.Map;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ErrorResponse {
    @Builder.Default
    private boolean success = false;
    private String error;
    private String message;
    private Map<String, String> details;
    private Map<String, String> validationErrors;
    @Builder.Default
    private Instant timestamp = Instant.now();
}
