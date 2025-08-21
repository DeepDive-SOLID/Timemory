# Team (팀/그룹) 모듈

## 개요
팀(그룹) 관리 기능을 담당하는 모듈로, 팀 생성/조회/수정/삭제 및 팀 멤버 관리 기능을 제공합니다.
JWT 인증 기반으로 동작하며, 닉네임 중심의 사용자 친화적인 인터페이스를 제공합니다.

## 파일 구조 및 기능

### Controller
- **TeamController.java**: 팀 관련 REST API 엔드포인트 처리

### Service
- **TeamService.java**: 팀 관련 비즈니스 로직 처리 (@Transactional 적용)

### DTO

#### Request DTO
- **TeamCreateRequestDto.java**: 팀 생성 요청 DTO (팀명, 초대 닉네임 리스트)
- **TeamRequestDto.java**: 팀 수정 요청 DTO (팀명)
- **TeamMemberRequestDto.java**: 팀원 추가 요청 DTO (닉네임)

#### Response DTO
- **TeamResponseDto.java**: 팀 정보 응답 DTO (팀 정보, 멤버 수, 멤버 프로필 리스트)
- **TeamMemberDto.java**: 팀 멤버 정보 DTO (멤버 ID, 닉네임, 프로필 이미지)
- **MemberProfileDto.java**: 멤버 프로필 DTO (멤버 ID, 닉네임, 프로필 이미지)

### Repository
- **TeamRepositoryCustom.java**: QueryDSL 커스텀 인터페이스
- **TeamRepositoryImpl.java**: TeamRepositoryCustom 구현체 (복잡한 쿼리 처리)

## API 목록

### [팀 생성 및 멤버 초대]
- **HTTP method**: POST
- **HTTP request URL**: /api/teams
- **Authentication**: JWT Bearer Token (Required)
- **Request Body**: TeamCreateRequestDto
  ```json
  {
    "teamName": "개발팀",
    "inviteNicknames": ["user1", "user2"]
  }
  ```
- **Return**: ResponseEntity<TeamResponseDto> (201 Created)

### [전체 팀 목록 조회]
- **HTTP method**: GET
- **HTTP request URL**: /api/teams
- **Authentication**: Not Required
- **Return**: ResponseEntity<List<TeamResponseDto>>

### [팀 상세 정보 조회]
- **HTTP method**: GET
- **HTTP request URL**: /api/teams/{teamId}
- **Authentication**: Not Required
- **Path Variable**: teamId (팀 ID)
- **Return**: ResponseEntity<TeamResponseDto>

### [팀 정보 수정]
- **HTTP method**: PUT
- **HTTP request URL**: /api/teams/{teamId}
- **Authentication**: JWT Bearer Token (Required)
- **Path Variable**: teamId (팀 ID)
- **Request Body**: TeamRequestDto
- **Return**: ResponseEntity<TeamResponseDto>

### [팀 멤버 목록 조회]
- **HTTP method**: GET
- **HTTP request URL**: /api/teams/{teamId}/members
- **Authentication**: Not Required
- **Path Variable**: teamId (팀 ID)
- **Return**: ResponseEntity<List<TeamMemberDto>>

### [팀원 추가 (닉네임으로)]
- **HTTP method**: POST
- **HTTP request URL**: /api/teams/{teamId}/members
- **Authentication**: JWT Bearer Token (Required)
- **Path Variable**: teamId (팀 ID)
- **Request Body**: TeamMemberRequestDto
- **Return**: ResponseEntity<MemberProfileDto> (201 Created)

### [팀 탈퇴]
- **HTTP method**: DELETE
- **HTTP request URL**: /api/teams/{teamId}/members/{memberId}
- **Authentication**: JWT Bearer Token (Required)
- **Path Variables**: 
  - teamId (팀 ID)
  - memberId (탈퇴할 회원 ID)
- **Return**: ResponseEntity<Void> (204 No Content)
- **Note**: 본인만 탈퇴 가능 (JWT 토큰으로 본인 확인)

### [특정 회원이 속한 팀 목록 조회]
- **HTTP method**: GET
- **HTTP request URL**: /api/teams/member/{memberId}
- **Authentication**: Not Required
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