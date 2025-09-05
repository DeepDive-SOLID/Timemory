package solid.backend.exception;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

/**
 * 에러 코드 정의
 * 각 도메인별 에러 코드 관리
 * @author Timemory Team
 */
@Getter
@RequiredArgsConstructor
public enum ErrorCode {
    
    // Common Errors (1000번대)
    INVALID_INPUT_VALUE(HttpStatus.BAD_REQUEST, "COMMON_001", "잘못된 입력값입니다"),
    RESOURCE_NOT_FOUND(HttpStatus.NOT_FOUND, "COMMON_002", "리소스를 찾을 수 없습니다"),
    METHOD_NOT_ALLOWED(HttpStatus.METHOD_NOT_ALLOWED, "COMMON_003", "허용되지 않은 메서드입니다"),
    INTERNAL_SERVER_ERROR(HttpStatus.INTERNAL_SERVER_ERROR, "COMMON_004", "서버 내부 오류가 발생했습니다"),
    
    // Member Errors (2000번대)
    MEMBER_NOT_FOUND(HttpStatus.NOT_FOUND, "MEMBER_001", "존재하지 않는 회원입니다"),
    DUPLICATE_MEMBER_NICKNAME(HttpStatus.CONFLICT, "MEMBER_002", "이미 사용중인 닉네임입니다"),
    DUPLICATE_MEMBER_EMAIL(HttpStatus.CONFLICT, "MEMBER_003", "이미 사용중인 이메일입니다"),
    INVALID_MEMBER_ID(HttpStatus.BAD_REQUEST, "MEMBER_004", "유효하지 않은 회원 ID입니다"),
    
    // Team Errors (3000번대)
    TEAM_NOT_FOUND(HttpStatus.NOT_FOUND, "TEAM_001", "존재하지 않는 팀입니다"),
    DUPLICATE_TEAM_NAME(HttpStatus.CONFLICT, "TEAM_002", "이미 사용중인 팀 이름입니다"),
    NOT_TEAM_MEMBER(HttpStatus.FORBIDDEN, "TEAM_003", "팀에 속해있지 않은 멤버입니다"),
    ALREADY_TEAM_MEMBER(HttpStatus.CONFLICT, "TEAM_004", "이미 팀에 속해있는 멤버입니다"),
    
    // Permission Errors (4000번대)
    UNAUTHORIZED(HttpStatus.UNAUTHORIZED, "AUTH_001", "인증이 필요합니다"),
    FORBIDDEN(HttpStatus.FORBIDDEN, "AUTH_002", "권한이 없습니다"),
    INVALID_TOKEN(HttpStatus.UNAUTHORIZED, "AUTH_003", "유효하지 않은 토큰입니다"),
    EXPIRED_TOKEN(HttpStatus.UNAUTHORIZED, "AUTH_004", "만료된 토큰입니다"),
    SELF_ACTION_ONLY(HttpStatus.FORBIDDEN, "AUTH_005", "본인만 수행할 수 있는 작업입니다"),
    
    // Capsule Errors (5000번대)
    CAPSULE_NOT_FOUND(HttpStatus.NOT_FOUND, "CAPSULE_001", "존재하지 않는 캡슐입니다"),
    CAPSULE_NOT_OPENED(HttpStatus.FORBIDDEN, "CAPSULE_002", "아직 열 수 없는 캡슐입니다"),
    INVALID_CAPSULE_TYPE(HttpStatus.BAD_REQUEST, "CAPSULE_003", "유효하지 않은 캡슐 타입입니다");
    
    private final HttpStatus httpStatus;
    private final String code;
    private final String message;
}