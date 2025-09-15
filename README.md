# Timemory

### 프로젝트 소개
타입캡슐을 기반으로 한 감정적 동기부여와 추억을 연결하는 커뮤니케이션 서비스를 제공합니다.
- 대상 : 2030 MZ 세대, 연인/친구/가족 단위 사용자, 자기개발족
- 핵심 기능 : 특정 날짜/위치/조건에 도달하면 자동으로 발송되는 메시지 예약

---

### 팀원
<div align="center">
    <table>
    <tr>
      <th>FE</td>
      <th>FE</td>
      <th>FE/BE</td>
      <th>FE</td>
      <th>BE</td>
      <th>BE</th>
    </tr>
    <tr>
      <td><p align="center"><img class="avatar avatar-user" src="https://avatars.githubusercontent.com/u/194752198?s=96&amp;v=4" width="48" height="48" alt="@w-jins"></td>
      <td><p align="center"><img class="avatar avatar-user" src="https://avatars.githubusercontent.com/u/160034314?s=96&amp;v=4" width="48" height="48" alt="@lnylnylnylny"></td>
      <td><p align="center"><img class="avatar avatar-user" src="https://avatars.githubusercontent.com/u/89690794?s=96&amp;v=4" width="48" height="48" alt="@koyulim"></td>
      <td><p align="center"><img class="avatar avatar-user" src="https://avatars.githubusercontent.com/u/143973893?s=96&amp;v=4" width="48" height="48" alt="@dyoni2"></td>
      <td><p align="center"><img class="avatar avatar-user" src="https://avatars.githubusercontent.com/u/57864253?s=96&amp;v=4" width="48" height="48" alt="@shinyyseon"></td>
      <td><p align="center"><img class="avatar avatar-user" src="https://avatars.githubusercontent.com/u/67557335?v=4" width="48" height="48" alt="@rktkdduq01"></td>
    </tr>
    <tr>
      <td>김우진<br>@w-jins</td>
      <td>이나영<br>@lnylnylnylny</td>
      <td>고유림<br>@koyulim</td>
      <td>정지연<br>@dyoni2</td>
      <td>신용선<br>@shinyyseon</td>
      <td>가상엽<br>@Shelfey</td>
  </table>
</div>

---

### 기술스택

<table>
  <tr>
    <td><strong>FrontEnd</strong></td>
    <td>
      <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=React&logoColor=white">
      <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=TypeScript&logoColor=white">
      <img src="https://img.shields.io/badge/Scss-CC6699?style=for-the-badge&logo=Sass&logoColor=white">
      <img src="https://img.shields.io/badge/axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white">
      <img src="https://img.shields.io/badge/redux-764ABC?style=for-the-badge&logo=redux&logoColor=white">
    </td>
  </tr>
  <tr>
    <td><strong>BackEnd</strong></td>
    <td>
      <img src="https://img.shields.io/badge/java-007396?style=for-the-badge&logo=OpenJDK&logoColor=white"> 
      <img src="https://img.shields.io/badge/Spring-6DB33F?style=for-the-badge&logo=Spring&logoColor=white">
      <img src="https://img.shields.io/badge/spring boot-6DB33F?style=for-the-badge&logo=springboot&logoColor=white">
      <img src="https://img.shields.io/badge/spring security-6DB33F?style=for-the-badge&logo=springsecurity&logoColor=white">
      <img src="https://img.shields.io/badge/json web tokens-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white">
    </td>
  </tr>
  <tr>
    <td><strong>Tools</strong></td>
    <td>
      <img src="https://img.shields.io/badge/github-181717?style=for-the-badge&logo=github&logoColor=white">
      <img src="https://img.shields.io/badge/intellij%20idea-000000.svg?&style=for-the-badge&logo=intellij%20idea&logoColor=white" />
      <img src="https://img.shields.io/badge/Visual%20Studio%20Code-007ACC.svg?&style=for-the-badge&logo=Visual%20Studio%20Code&logoColor=white"/>
      <img src="https://img.shields.io/badge/Notion-000000?style=for-the-badge&logo=Notion&logoColor=white">
      <img src="https://img.shields.io/badge/Drawio-F08705?style=for-the-badge&logo=diagramsdotnet&logoColor=white">
      <img src="https://img.shields.io/badge/Figma-F24E1E?style=for-the-badge&logo=Figma&logoColor=white">
      <img src="https://img.shields.io/badge/discord-5865F2?style=for-the-badge&logo=discord&logoColor=white">
      <img src="https://img.shields.io/badge/ERDCloud-000000?style=for-the-badge">
    </td>
  </tr>
  <tr>
    <td><strong>Infra</strong></td>
    <td>
      <img src="https://img.shields.io/badge/Amazon%20EC2-FF9900?style=for-the-badge&logo=Amazon%20EC2&logoColor=white">
    </td>
  </tr>
  <tr>
    <td><strong>Storage</strong></td>
    <td>
      <img src="https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white">
      <img src="https://img.shields.io/badge/H2 Database-09476B?style=for-the-badge&logo=H2Database&logoColor=white">
    </td>
  </tr>
</table>

외부 API
- 카카오 API (카카오 로그인, 맵, 메시지 전송)
- 구글 API (내용 검열)
---

### 주요 기능
1. 회원 관리
    - 회원가입 : 최초 로그인 시 카카오 API를 통해 전달받은 회원정보를 DB에 저장하고 닉네임 설정합니다.
    - 로그인 : 카카오 로그인을 통해 로그인 가능, DB에 회원 정보가 있을 경우 로그인 성공합니다.

2. 그룹 CRUD
   - 팀을 생성할 수 있음. 그룹명을 설정하고 다른 사용자를 초대할 수 있습니다.
   - 그룹을 만든 뒤 탈퇴기능으로 그룹 탈퇴가 가능합니다. 그룹의 경우 본인만 탈퇴 가능합니다. 

3. 캡슐 CRUD
	  - 캡슐은 날짜, 위치, 조건을 기반으로 타임 캡슐 생성이 가능합니다.
	  - 날짜의 경우 날짜를 설정하고 위치의 경우 카카오 맵을 사용하여 위치를 설정할 수 있습니다. 조건의 경우 사용자가 원하는 열림 조건을 설정할 수 있습니다.
	  - 캡슐 타입에 맞는 입력이 끝난 뒤 캡슐 속 내용을 작성합니다. 내용은 구글 API를 사용하여 부적절한 언어를 필터링합니다.
	  - 필터 기준(공격적/유해한 언어, 모욕적인 언어, 일반적인 욕설/저속한 언어)을 통해 내용을 수치화하여 기준치를 이상인 경우 필터링합니다.
	  - 캡슐의 내용과 관련되어 사용자가 해쉬태그 및 이미지를 등록할 수 있습니다.
	  - 등록된 캡슐은 그룹 내부 페이지 또는 본인이 등록한 캡슐을 확인할 수 있는 캡슐 탭에서 확인가능하고 삭제 가능합니다.
	   
4. 오픈 그룹
	  - 새해, 크리스마스 등 기념일을 지정해서 모든 사용자가 기념일에 등록한 캡슐을 확인할 수 있습니다.
	  - 해당 기념일이 되면 등록했던 모든 캡슐이 열려서 모든 사용자에게 공유됩니다.

5. 캡슐 오픈
	  - 캡슐 타입에 맞게 캡슐이 오픈됩니다.
	  - 날짜의 경우 스케쥴러를 사용하여 만료날짜를 확인 후 자동으로 메시지, 메일을 전송하여 캡슐이 열렸다는 것을 사용자에게 알립니다.
	  - 위치의 경우 사용자가 해당 위치에 도달했을 때 등록한 위치와 비교하여 캡슐이 열리게 됩니다.
	  - 조건의 경우 해당 조건을 달성했을 때 캡슐을 열 수 있게 설정하였습니다.

6. 그룹 내부
	  - 그룹 내부에서 그룹 사용자들이 등록한 캡슐을 확인할 수 있습니다.
	  - 캡슐이 열리지 않은 경우에는 자물쇠 표시를 통해 열람이 불가능합니다.
	  - 위치 캡슐의 경우 지도를 통해 등록한 위치의 캡슐이 표시됩니다.
	  - 캡슐 등록은 그룹 내부에서 가능합니다.

7. 메시지, 메일 전송
 	- 등록했던 캡슐 타입에 맞게 캡슐이 열리면 카카오 메시지와 메일을 전송합니다.
  	- 등록했던 모든 캡슐은 오픈되었을 때 자동으로 메시지, 메일을 발송하여 사용자에게 알립니다.

8. 알림 기능
	  - 열린 캡슐을 기준으로 홈 화면에서 알림을 확인할 수 있습니다.
	  - react router를 통해 클릭한 알림의 경우 회색, 클릭하지 않은 알림의 경우 검은색으로 알림을 확인할 수 있습니다.

9. 마이페이지
    - 사용자 정보를 수정할 수 있습니다.
    - 사용자가 원하는 사진으로 프로필 이미지 변경 가능합니다.
    - 서비스를 사용하지 않을 땐 회원 탈퇴가 가능합니다. 회원 탈퇴를 진행할 경우 그룹, 등록한 캡슐 등 모든 데이터가 삭제됩니다.

10. 이미지 첨부 기능
    - 이미지 정보 추가 및 삭제 : 로컬 디렉토리에 있는 이미지 추가 및 삭제합니다.
    - 이미지 경로 커스텀 : 로컬 디렉토리 경로 핸들링

11. 사용자 인증 및 보안 기능
    -  JWT : 토큰 발급, 검증, 재발급합니다. 해당 토큰의 권한을 확인하여 서비스를 이용할 수 있습니다. 토큰이 없는 경우 재로그인 해야합니다.
    - Spring Security : 권한에 따라 접근할 수 있도록 설정합니다.

12. 캐싱 기능
	  - DB를 자주 접근하는 상황에 대비하여 캐싱 기능을 이용하였습니다.
	  - Team, Member, aniversaries, mypage에서 캐싱 기능을 사용하고 있습니다. 

---

### 사용가이드
1. 회원가입 로그인
    - 서비스 접속
    - 카카오 로그인 버튼 클릭
    - 약관 동의 및 닉네임 설정
    - 서비스 사용  

2. 홈 화면
	- 캡슐 알림 확인 가능
	- 캡슐 오픈 가능

3. 그룹 생성
	- 그룹 생성 버튼 클릭
	- 그룹 이름 입력 및 초대하고 싶은 사용자 닉네임 입력
	- 그룹 생성 완료

4. 캡슐 생성
	- 캡슐 생성 버튼 클릭
	- 날짜, 위치, 조건 선택
 	- 필수 데이터 입력 캡슐 생성
	- 캡슐 생성 완료

5. 캡슐 확인
  	- 생성한 그룹 클릭 시 그룹 내부 입장
  	- 등록한 캡슐 확인 가능
  	- 또는 캡슐 탭으로 이동
  	- 사용자 본인이 등록 캡슐 목록 확인 가능
  	- 삭제만 가능

6. 오픈 그룹
  	- 하단 그룹 탭 클릭
  	- 상단 오픈 그룹 클릭
  	- 등록되어 있는 기념일 그룹 클릭
  	- 그룹 입장 및 캡슐 생성

7.  마이 캡슐
  	- 하단 캡슐 아이콘 클릭
  	- 사용자가 등록한 캡슐 목록을 통해 확인 가능
  	- 캡슐 삭제 버튼 클릭 시 캡슐 삭제

8. 캡슐 오픈
  	- 등록한 캡슐의 특정 조건(날짜, 위치, 조건) 달성 시 캡슐 오픈 가능
  	- 오픈 가능할 때 자동으로 메시지 및 메일 발송
  	- 홈화면 알림을 통해 오픈 캡슐 확인 가능

### 개발 일정

<img width="1255" height="707" alt="image" src="https://github.com/user-attachments/assets/2fdc6059-64cc-4455-8b0a-868618babb36" />


### 초기 설계

플로우차트

| 로그인 | 홈 |  그룹 화면 |
|:-------------:|:-------------:|:-------------:|
| <img width="850" height="721" alt="image" src="https://github.com/user-attachments/assets/e7bf1ff8-3412-45f0-94f4-19383ec70fc7" /> | <img width="850" height="717" alt="image" src="https://github.com/user-attachments/assets/ab21aa46-82e2-4767-831f-55136fe968f2" /> | <img width="850" height="670" alt="image" src="https://github.com/user-attachments/assets/c7c7027e-4a9a-4dbb-9062-eb6769942857" /> |
| 그룹 내부 | 마이 캡슐 화면 | 마이페이 |
| <img width="850" height="719" alt="image" src="https://github.com/user-attachments/assets/f5414a9c-f618-4f40-b3a2-38b8418490fe" /> | <img width="557" height="496" alt="image" src="https://github.com/user-attachments/assets/494eaf45-2a19-4617-b0f1-8899584555fa" /> | <img width="521" height="668" alt="image" src="https://github.com/user-attachments/assets/a254c5c0-a5f8-4828-8e3a-4fc6bb9000bd" /> |

ERD

<img width="1422" height="626" alt="image" src="https://github.com/user-attachments/assets/4bf78c65-99db-48b9-b1d0-df2cf9324be6" />


아키텍처

<img width="1259" height="700" alt="image" src="https://github.com/user-attachments/assets/28b05f2a-1bd1-4498-9d49-022c588f68df" />

