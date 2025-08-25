package solid.backend.exception;

import lombok.Builder;
import lombok.Getter;
import org.springframework.http.ResponseEntity;

import java.time.LocalDateTime;

/**
 * 에러 응답 DTO
 * 클라이언트에 전달될 에러 정보 포맷
 * @author Timemory Team
 */
@Getter
@Builder
public class ErrorResponse {
    
    private final String timestamp;
    private final int status;
    private final String error;
    private final String code;
    private final String message;
    private final String path;
    
    /**
     * ErrorCode로부터 ErrorResponse 생성
     */
    public static ResponseEntity<ErrorResponse> toResponseEntity(ErrorCode errorCode, String path) {
        return ResponseEntity
                .status(errorCode.getHttpStatus())
                .body(ErrorResponse.builder()
                        .timestamp(LocalDateTime.now().toString())
                        .status(errorCode.getHttpStatus().value())
                        .error(errorCode.getHttpStatus().name())
                        .code(errorCode.getCode())
                        .message(errorCode.getMessage())
                        .path(path)
                        .build());
    }
    
    /**
     * CustomException으로부터 ErrorResponse 생성
     */
    public static ResponseEntity<ErrorResponse> toResponseEntity(CustomException e, String path) {
        ErrorCode errorCode = e.getErrorCode();
        return ResponseEntity
                .status(errorCode.getHttpStatus())
                .body(ErrorResponse.builder()
                        .timestamp(LocalDateTime.now().toString())
                        .status(errorCode.getHttpStatus().value())
                        .error(errorCode.getHttpStatus().name())
                        .code(errorCode.getCode())
                        .message(e.getMessage())
                        .path(path)
                        .build());
    }
}