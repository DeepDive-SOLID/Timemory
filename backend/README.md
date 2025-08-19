# TIMEMOEY CAPSULE

# 프로젝트 디렉토리 구조
src/main/java/solid/backend

- login : 회원 관리
- capsule : 캡슐 관리
- open : 오픈 그룹 관리
- common : 공통 기능
  - FileManager : 파일 관리 모듈
- config: 설정파일
  - QueryDSLConfig: QueryDSL 빈 등록
  - FileStorageConfig : 파일 설정 값 관리
  - FileStorageHandlerConfig : 업로드 파일에 대한 정적 리소스 핸들링 설정
  - SecurityConfig : 권한 관리
- entity : 엔티티
  - TeamMemberId : 팀 멤버 ID
  - TeamMember : 팀 멤버
  - Team : 팀
  - Member : 회원
  - CapsuleLT : 캡슐 위치
  - CapsuleCNDT : 캡슐 조건
  - Capsule : 캡슐
  - Anniversary : 기념일
- jpaRepository : JPA Repository
  - MemberRepository : 회원
  - TeamRepository : 팀
  - TeamMemberRepository : 팀 멤버
  - CapsuleRepository : 캡슐
- Jwt