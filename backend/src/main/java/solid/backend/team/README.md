# Team (팀/그룹) 모듈

## 파일 구조 및 기능

### Controller
- **TeamController.java**: 팀 관련 API 엔드포인트 처리

### Service
- **TeamService.java**: 팀 관련 비즈니스 로직 처리

### DTO

#### Request DTO
- **TeamCreateRequestDto.java**: 팀 생성 요청 DTO
- **TeamRequestDto.java**: 팀 수정 요청 DTO
- **TeamMemberRequestDto.java**: 팀원 추가 요청 DTO

#### Response DTO
- **TeamResponseDto.java**: 팀 정보 응답 DTO
- **TeamMemberDto.java**: 팀 멤버 정보 DTO

### Repository
- **TeamRepositoryCustom.java**: QueryDSL 커스텀 인터페이스
- **TeamRepositoryImpl.java**: TeamRepositoryCustom 구현체

## API 목록

### [팀 생성 및 멤버 초대]
- **HTTP method**: POST
- **HTTP request URL**: /api/teams
- **Request Header**: X-Member-Id (생성자 ID)
- **Request Body**: TeamCreateRequestDto
- **Return**: ResponseEntity<TeamResponseDto>

### [팀 상세 정보 조회]
- **HTTP method**: GET
- **HTTP request URL**: /api/teams/{teamId}
- **Path Variable**: teamId (팀 ID)
- **Return**: ResponseEntity<TeamResponseDto>

### [팀 정보 수정]
- **HTTP method**: PUT
- **HTTP request URL**: /api/teams/{teamId}
- **Path Variable**: teamId (팀 ID)
- **Request Body**: TeamRequestDto
- **Return**: ResponseEntity<TeamResponseDto>

### [팀 멤버 목록 조회]
- **HTTP method**: GET
- **HTTP request URL**: /api/teams/{teamId}/members
- **Path Variable**: teamId (팀 ID)
- **Return**: ResponseEntity<List<TeamMemberDto>>

### [팀원 추가 (닉네임으로)]
- **HTTP method**: POST
- **HTTP request URL**: /api/teams/{teamId}/members
- **Path Variable**: teamId (팀 ID)
- **Request Body**: TeamMemberRequestDto
- **Return**: ResponseEntity<Void> (201 Created)

### [팀 탈퇴]
- **HTTP method**: DELETE
- **HTTP request URL**: /api/teams/{teamId}/members/{memberId}
- **Path Variables**: 
  - teamId (팀 ID)
  - memberId (탈퇴할 회원 ID)
- **Request Header**: X-Member-Id (요청자 ID)
- **Return**: ResponseEntity<Void> (204 No Content)

### [특정 회원이 속한 팀 목록 조회]
- **HTTP method**: GET
- **HTTP request URL**: /api/teams/member/{memberId}
- **Path Variable**: memberId (회원 ID)
- **Return**: ResponseEntity<List<TeamResponseDto>>

## 주요 기능

### 1. 팀 생성
- 팀명과 초대할 닉네임 리스트로 팀 생성
- 생성자는 자동으로 첫 번째 멤버가 됨
- 초대 실패한 닉네임은 로그 기록 후 계속 진행

### 2. 팀 관리
- 팀명 수정 가능
- 멤버 0명 시 팀 자동 삭제
- 그룹장 개념 없음 (모든 멤버 동등)

### 3. 팀 멤버 관리
- 닉네임으로 팀원 추가
- 본인만 팀 탈퇴 가능
- 팀 멤버 목록 조회

### 4. 팀 조회
- 팀 정보 조회 (멤버 수, 멤버 프로필 포함)
- 특정 회원이 속한 팀 목록 조회

## 예외 처리

### 주요 에러 코드
- **TEAM_001**: 존재하지 않는 팀입니다 (404)
- **TEAM_002**: 이미 사용중인 팀 이름입니다 (409)
- **TEAM_003**: 팀에 속해있지 않은 멤버입니다 (403)
- **TEAM_004**: 이미 팀에 속해있는 멤버입니다 (409)
- **AUTH_005**: 본인만 수행할 수 있는 작업입니다 (403)