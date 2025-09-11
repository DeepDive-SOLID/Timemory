### 마이페이지 관리 : api/mypage
- controller(컨트롤러)
  - MypageController.java
- dto(객체정보)
  - MypageDto.java
  - MypageUpdDto.java
- service(비즈니스 로직)
  - MypageService.java
  - MypageServiceImpl.java

### API 목록
[회원 정보 조회]  
HTTP method : POST  
HTTP request URL : api/mypage/getMemberDto  
param : memberId(String)  
return : MypageDto

[회원 정보 수정]  
HTTP method : PUT  
HTTP request URL : api/mypage/updateMemberDto  
param : memberDto(MypageUpdDto)  
return : ResponseEntity(String)

[회원 정보 삭제]  
HTTP method : DELETE  
HTTP request URL : api/mypage/deleteMemberDto  
param : memberId(String)  
return : ResponseEntity(String)  