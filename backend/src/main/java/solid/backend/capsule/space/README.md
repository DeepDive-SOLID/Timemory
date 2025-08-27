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