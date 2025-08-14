# Member (회원) 모듈

## 파일 구조 및 기능

### Controller
- **MemberController.java**: 회원 관련 API 엔드포인트 처리
### Service
- **MemberService.java**: 회원 관련 비즈니스 로직 처리
### DTO
- **MemberResponseDto.java**: 회원 정보 응답 DTO
- **MemberProfileDto.java**: 회원 프로필 간단 정보 DTO

### Repository
- **MemberRepositoryCustom.java**: QueryDSL 커스텀 인터페이스
- **MemberRepositoryImpl.java**: MemberRepositoryCustom 구현체


## API 목록

### [회원 정보 조회]
- **HTTP method**: GET
- **HTTP request URL**: /api/members/{memberId}
- **Path Variable**: memberId (카카오 회원 ID)
- **Return**: ResponseEntity<MemberResponseDto>


### [회원이 속한 팀 목록 조회]
- **HTTP method**: GET
- **HTTP request URL**: /api/members/{memberId}/teams
- **Path Variable**: memberId (카카오 회원 ID)
- **Return**: ResponseEntity<List<TeamResponseDto>>

### [닉네임으로 회원 검색 (정확히 일치)]
- **HTTP method**: GET
- **HTTP request URL**: /api/members/search/exact
- **Request Param**: nickname (검색할 닉네임)
- **Return**: ResponseEntity<MemberResponseDto>

### [닉네임으로 회원 검색 (부분 일치)]
- **HTTP method**: GET
- **HTTP request URL**: /api/members/search
- **Request Param**: keyword (검색 키워드)
- **Return**: ResponseEntity<List<MemberResponseDto>>

## 주요 기능

### 1. 회원 정보 관리
- 카카오 로그인을 통해 받은 회원 정보 관리
- 회원 ID, 닉네임, 이메일, 프로필 이미지 저장

### 2. 회원 검색
- 닉네임 정확 일치 검색
- 닉네임 부분 일치 검색 (키워드 포함)

### 3. 팀 연관 조회
- 회원이 속한 모든 팀 목록 조회
- 팀 정보에는 멤버 수와 멤버 프로필 포함

## 예외 처리

### 주요 에러 코드
- **MEMBER_001**: 존재하지 않는 회원입니다 (404)
- **MEMBER_002**: 이미 사용중인 닉네임입니다 (409)
- **MEMBER_003**: 이미 사용중인 이메일입니다 (409)
- **MEMBER_004**: 유효하지 않은 회원 ID입니다 (400)