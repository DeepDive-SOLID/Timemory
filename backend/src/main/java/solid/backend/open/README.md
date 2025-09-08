### 오픈 그룹 : /api/open
- controller(컨트롤러)
    - OpenController.java
- dto(객체정보)
    - OpenListDto.java
    - OpenCapsuleListDto.java
    - OpenCapsuleAddDto.java
- repository(Query DSL)
    - OpenQueryRepository.java
- service(비즈니스 로직)
    - OpenService.java
    - OpenServiceImpl.java

### API 목록
[오픈 그룹 리스트 정보]
- HTTP method : GET
- HTTP request URL : /api/open/getOpenList
- return : List<OpenListDto>

[오픈 그룹 캡슐 리스트 정보]
- HTTP method : POST
- HTTP request URL : /api/open/getOpenCapsuleList
- param : teamId(Integer)
- return : ResponseEntity<OpenCapsuleListDto>

[오픈 그룹 캡슐 추가]
- HTTP method : POST
- HTTP request URL : /api/open/addOpenCapsuleDto
- param : capsuleDto(OpenCapsuleAddDto)
- return : ResponseEntity<String>
