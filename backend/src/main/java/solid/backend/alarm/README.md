### 캡슐 조건 : /api/alarm
- controller(컨트롤러)
    - AlarmController.java
- dto(객체정보)
    - AlarmDto.java
- repository(QueryDSL)
  - AlarmQueryRepository
- service(비즈니스 로직)
    - AlarmService.java
    - AlarmServiceImpl.java

### API 목록
[알림 리스트 조회]
- HTTP method : POST
- HTTP request URL : /api/alarm/list
- param : memberId
- return : List<AlarmDto>

[알림 삭제]
- HTTP method : POST
- HTTP request URL : /api/alarm/del
- param : alarmId
- return : ResponseEntity<String>