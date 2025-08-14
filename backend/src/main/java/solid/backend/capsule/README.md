### 캡슐 위치 : /api/capsule/lt
- controller(컨트롤러)
    - LtController.java
- dto(객체정보)
    - LtAddDto.java
    - LtListDto.java
- repository(Query DSL)
  - LtQueryRepository.java
- service(비즈니스 로직)
    - LtService.java
    - LtServiceImpl.java

### API 목록
[조회]
- HTTP method : POST  
- HTTP request URL : /api/capsule/lt/getLtList  
- param : teamId(Integer)  
- return : ResponseEntity<LtListDto>

[추가]
- HTTP method : POST
- HTTP request URL : /api/capsule/lt/addLtDto  
- param : ltDto(LtAddDto)  
- return : ResponseEntity<String>  
