package solid.backend.exception;

import jakarta.servlet.http.HttpServletRequest;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindException;
import org.springframework.web.HttpRequestMethodNotSupportedException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;

/**
 * 전역 예외 처리 핸들러
 * 모든 컨트롤러에서 발생하는 예외를 일괄 처리
 * @author Timemory Team
 */
@Slf4j
@RestControllerAdvice
public class GlobalExceptionHandler {
    
    /**
     * CustomException 처리
     */
    @ExceptionHandler(CustomException.class)
    public ResponseEntity<ErrorResponse> handleCustomException(
            CustomException e, HttpServletRequest request) {
        log.error("CustomException: {}", e.getMessage());
        return ErrorResponse.toResponseEntity(e, request.getRequestURI());
    }
    
    /**
     * Validation 예외 처리 (@Valid)
     */
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ErrorResponse> handleMethodArgumentNotValidException(
            MethodArgumentNotValidException e, HttpServletRequest request) {
        log.error("MethodArgumentNotValidException: {}", e.getMessage());
        
        String errorMessage = e.getBindingResult()
                .getFieldErrors()
                .stream()
                .findFirst()
                .map(error -> error.getDefaultMessage())
                .orElse("유효성 검증 실패");
        
        return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body(ErrorResponse.builder()
                        .timestamp(java.time.LocalDateTime.now().toString())
                        .status(HttpStatus.BAD_REQUEST.value())
                        .error(HttpStatus.BAD_REQUEST.name())
                        .code("COMMON_001")
                        .message(errorMessage)
                        .path(request.getRequestURI())
                        .build());
    }
    
    /**
     * Binding 예외 처리
     */
    @ExceptionHandler(BindException.class)
    public ResponseEntity<ErrorResponse> handleBindException(
            BindException e, HttpServletRequest request) {
        log.error("BindException: {}", e.getMessage());
        
        String errorMessage = e.getBindingResult()
                .getFieldErrors()
                .stream()
                .findFirst()
                .map(error -> error.getDefaultMessage())
                .orElse("바인딩 실패");
        
        return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body(ErrorResponse.builder()
                        .timestamp(java.time.LocalDateTime.now().toString())
                        .status(HttpStatus.BAD_REQUEST.value())
                        .error(HttpStatus.BAD_REQUEST.name())
                        .code("COMMON_001")
                        .message(errorMessage)
                        .path(request.getRequestURI())
                        .build());
    }
    
    /**
     * 타입 불일치 예외 처리
     */
    @ExceptionHandler(MethodArgumentTypeMismatchException.class)
    public ResponseEntity<ErrorResponse> handleMethodArgumentTypeMismatchException(
            MethodArgumentTypeMismatchException e, HttpServletRequest request) {
        log.error("MethodArgumentTypeMismatchException: {}", e.getMessage());
        
        return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body(ErrorResponse.builder()
                        .timestamp(java.time.LocalDateTime.now().toString())
                        .status(HttpStatus.BAD_REQUEST.value())
                        .error(HttpStatus.BAD_REQUEST.name())
                        .code("COMMON_001")
                        .message("잘못된 파라미터 타입입니다")
                        .path(request.getRequestURI())
                        .build());
    }
    
    /**
     * HTTP Method 불일치 예외 처리
     */
    @ExceptionHandler(HttpRequestMethodNotSupportedException.class)
    public ResponseEntity<ErrorResponse> handleHttpRequestMethodNotSupportedException(
            HttpRequestMethodNotSupportedException e, HttpServletRequest request) {
        log.error("HttpRequestMethodNotSupportedException: {}", e.getMessage());
        
        return ErrorResponse.toResponseEntity(ErrorCode.METHOD_NOT_ALLOWED, request.getRequestURI());
    }
    
    /**
     * IllegalArgumentException 처리 (기존 코드 호환용)
     */
    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<ErrorResponse> handleIllegalArgumentException(
            IllegalArgumentException e, HttpServletRequest request) {
        log.error("IllegalArgumentException: {}", e.getMessage());
        
        // 메시지 내용에 따라 적절한 ErrorCode 매핑
        ErrorCode errorCode = mapMessageToErrorCode(e.getMessage());
        
        return ResponseEntity
                .status(errorCode.getHttpStatus())
                .body(ErrorResponse.builder()
                        .timestamp(java.time.LocalDateTime.now().toString())
                        .status(errorCode.getHttpStatus().value())
                        .error(errorCode.getHttpStatus().name())
                        .code(errorCode.getCode())
                        .message(e.getMessage())
                        .path(request.getRequestURI())
                        .build());
    }
    
    /**
     * 기타 모든 예외 처리
     */
    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponse> handleException(
            Exception e, HttpServletRequest request) {
        log.error("Exception: ", e);
        
        return ErrorResponse.toResponseEntity(ErrorCode.INTERNAL_SERVER_ERROR, request.getRequestURI());
    }
    
    /**
     * 메시지를 ErrorCode로 매핑 (기존 코드 호환용)
     */
    private ErrorCode mapMessageToErrorCode(String message) {
        if (message.contains("존재하지 않는 회원")) {
            return ErrorCode.MEMBER_NOT_FOUND;
        } else if (message.contains("존재하지 않는 팀")) {
            return ErrorCode.TEAM_NOT_FOUND;
        } else if (message.contains("팀에 속해있지 않은 멤버")) {
            return ErrorCode.NOT_TEAM_MEMBER;
        } else if (message.contains("본인만")) {
            return ErrorCode.SELF_ACTION_ONLY;
        } else if (message.contains("이미 사용중인 닉네임")) {
            return ErrorCode.DUPLICATE_MEMBER_NICKNAME;
        } else if (message.contains("이미 사용중인 이메일")) {
            return ErrorCode.DUPLICATE_MEMBER_EMAIL;
        } else {
            return ErrorCode.INVALID_INPUT_VALUE;
        }
    }
}