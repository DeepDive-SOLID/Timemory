# Member (회원) 모듈

## 파일 구조 및 기능

### Controller
- **MemberController.java**: 회원 관련 API 엔드포인트 처리
### Service
- **MemberService.java**: 회원 관련 비즈니스 로직 인터페이스
- **MemberServiceImpl.java**: MemberService 구현체
### DTO
- **MemberResponseDto.java**: 회원 정보 응답 DTO
- **MemberProfileDto.java**: 회원 프로필 간단 정보 DTO

### Repository
- **MemberQueryRepository.java**: QueryDSL을 사용한 복잡한 쿼리 처리


## API 목록

### [내 프로필 조회]
- **HTTP method**: GET
- **HTTP request URL**: /api/members/me
- **Authorization**: Bearer Token (JWT)
- **Return**: ResponseEntity<MemberResponseDto>


### [내가 속한 팀 목록 조회]
- **HTTP method**: GET
- **HTTP request URL**: /api/members/me/teams
- **Authorization**: Bearer Token (JWT)
- **Return**: ResponseEntity<List<TeamResponseDto>>

### [닉네임으로 회원 검색 (정확히 일치)]
- **HTTP method**: GET
- **HTTP request URL**: /api/members/search/exact
- **Request Param**: nickname (검색할 닉네임)
- **Return**: ResponseEntity<MemberResponseDto>

## 주요 기능

### 1. 회원 정보 관리
- 카카오 로그인을 통해 받은 회원 정보 관리
- 회원 ID, 닉네임, 이메일, 프로필 이미지 저장

### 2. 회원 검색
- 닉네임 정확 일치 검색

### 3. 팀 연관 조회
- 회원이 속한 모든 팀 목록 조회
- 팀 정보에는 멤버 수와 멤버 프로필 포함

## 예외 처리

### 주요 에러 코드
- **MEMBER_001**: 존재하지 않는 회원입니다 (404)
- **MEMBER_002**: 이미 사용중인 닉네임입니다 (409)
- **MEMBER_003**: 이미 사용중인 이메일입니다 (409)
- **MEMBER_004**: 유효하지 않은 회원 ID입니다 (400)