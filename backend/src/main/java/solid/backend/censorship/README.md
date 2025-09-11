### 캡슐 내용 검열 : /api/censorship
- controller(컨트롤러)
  - CensorshipController.java
- service(비즈니스 로직)
  - CensorshipService.java
  - CensorshipServiceImpl.java

### API 목록
[캡슐 내용 검열]
- HTTP method : POST
- HTTP request URL : api/censorship/checkContent
- param : content(String)
- return : ResponseEntity<Boolean>