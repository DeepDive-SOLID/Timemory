### 로그인 : /api/login
- controller(컨트롤러)
  - LoginController.java
- dto(객체정보)
  - LoginDto.java
  - LoginApiDto.java
- service(비즈니스 로직)
  - LoginService.java
  - LoginServiceImpl.java

### API 목록
[로그인]
- HTTP method : POST
- HTTP request URL : /api/login
- param : memberId(String)
- return : ResponseEntity<String>

[카카오 로그인]
- HTTP method : GET
- HTTP request URL : /api/login/kakao
- param : code(String)
- return : ResponseEntity<String>

[닉네임 중복 확인]
- HTTP method : POST
- HTTP request URL : /api/login/checkNickname
- param : checkInfo(LoginDto)
- return : ResponseEntity<Boolean>

[로그아웃]
- HTTP method : POST
- HTTP request URL : /api/login/logout
- return : ResponseEntity<String>