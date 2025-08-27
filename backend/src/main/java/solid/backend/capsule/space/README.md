### 캡슐 공간 : /api/capsule-space
- controller(컨트롤러)
  - CapsuleSpaceController.java
- dto(객체정보)
  - CapsuleSpaceResponseDto.java
  - CapsuleSummaryDto.java
- service(비즈니스 로직)
  - CapsuleSpaceService.java
  - CapsuleSpaceServiceImpl.java
- repository(데이터 접근)
  - CapsuleSpaceQueryRepository.java

### API 목록
[캡슐 공간 조회]
- HTTP method : GET
- HTTP request URL : /api/capsule-space
- Headers : Authorization: Bearer {JWT_TOKEN}
- param : 없음 (JWT에서 memberId 추출)
- return : ResponseEntity<CapsuleSpaceResponseDto>
- response : 
  ```json
  {
    "memberId": "String",
    "memberNickname": "String",
    "totalCapsules": "Integer",
    "capsules": [
      {
        "capsuleId": "Integer",
        "content": "String",
        "imageUrl": "String",
        "tag": "String",
        "openDate": "LocalDateTime",
        "createdAt": "LocalDateTime",
        "teamId": "Integer",
        "teamName": "String",
        "isOpened": "Boolean",
        "isAnniversary": "Boolean"
      }
    ]
  }
  ```

[캡슐 삭제]
- HTTP method : DELETE
- HTTP request URL : /api/capsule-space/{capsuleId}
- Headers : Authorization: Bearer {JWT_TOKEN}
- PathVariable : capsuleId(Integer) - 삭제할 캡슐 ID
- param : 없음
- return : ResponseEntity<Void>
- response : 
  - 성공: 204 No Content
  - 실패: 404 Not Found (캡슐 없음)
  - 실패: 403 Forbidden (권한 없음)

### 주요 기능
- 사용자가 작성한 모든 캡슐 조회 (일반 캡슐 + 기념일 캡슐)
- 캡슐 삭제 (작성자만 가능)
- 기념일 캡슐 자동 구분 (TIME_CAPSULE_ 접두어)
- 캡슐 열림/닫힘 상태 자동 계산 (openDate 기준)
- N+1 쿼리 최적화 (fetch join 사용)

### 에러 코드
- MEMBER_NOT_FOUND (MEMBER_001) : 존재하지 않는 회원입니다
- CAPSULE_NOT_FOUND (CAPSULE_001) : 캡슐을 찾을 수 없습니다
- UNAUTHORIZED (AUTH_001) : 권한이 없습니다