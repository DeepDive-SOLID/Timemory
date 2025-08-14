### 캡슐 조건 : /api/capsule/cndt
- controller(컨트롤러)
    - CapsuleCndtController.java
- dto(객체정보)
    - CapsuleCndtDto.java
    - CapsuleListDto.java
- service(비즈니스 로직)
    - CapsuleCndtService.java
    - CapsuleCndtServiceImpl.java

### API 목록
[조회]
- HTTP method : POST
- HTTP request URL : /api/capsule/cndt/list
- param : teamId
- return : ResponseEntity<CapsuleListDto>

[추가]
- HTTP method : POST
- HTTP request URL : /api/capsule/cndt/create
- param : CapsuleCndtDto
- return : ResponseEntity<String>

[삭제]
- HTTP method : DELETE
- HTTP request URL : /api/capsule/cndt/delete
- param : capId
- return : ResponseEntity<String>