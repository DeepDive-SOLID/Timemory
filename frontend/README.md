# Timemory

## 🛠️ 기술 스택

| 기술           | 설명                                    |
| -------------- | --------------------------------------- |
| **React**      | 컴포넌트 기반 UI 라이브러리             |
| **TypeScript** | 정적 타입으로 안정성과 가독성 향상      |
| **Vite**       | 빠른 번들링과 개발 서버 제공            |
| **SCSS**       | 스타일 모듈화, 변수/믹스인 등 사용 가능 |
| **Redux**      | 전역 상태 관리 도구                     |

---

## 📂 디렉토리 구조

```
src/
│
├── assets/           # 정적 리소스 (이미지, 아이콘 등)
│   ├── icons/
│   ├── images/
│   └── index.ts
│
├── components/       # 재사용 가능한 컴포넌트
│   ├── App/          # Layout 관련 (Header, Body, Footer 등)
│   ├── UI/           # 공통 UI 컴포넌트 (Button, Modal 등)
│   └── Domain/       # 페이지별 전용 컴포넌트
│
├── contexts/         # 전역 관련 컴포넌트
│   ├── AuthContext.ts
│   └── AuthProvider.ts
│
├── pages/            # 각 페이지 컴포넌트 (라우팅 단위)
│   └── Login.tsx     # 파스칼 케이스로 작성
│
├── styles/           # SCSS 모듈 및 전역 스타일
│   └── LoginButton.module.scss
│
├── utils/            # 유틸 함수 모음 (소문자, 기능 단위)
│   └── auth.ts
│
├── types/            # 타입 정의 파일 (카멜케이스, 소문자 시작)
│   └── home.ts
│
├── api/              # API 호출 함수 정의
│   └── HomeApi.ts
│
├── store/            # Redux 상태 관리
│   ├── index.ts      # 전역 스토어 정의
│   └── themeSlice.ts
│
├── hooks/            # 커스텀 훅 정의 (반드시 use 접두사)
│   └── useModal.ts
│
└── constants/        # 프로젝트 전역 상수 값 정의
    ├── routePath.ts
    └── defaultValues.ts
```

---

## 🧾 코드 컨벤션

### 📌 네이밍 규칙

| 항목                 | 규칙                        | 예시                          |
| -------------------- | --------------------------- | ----------------------------- |
| 컴포넌트             | PascalCase                  | `Login.tsx`, `MainHeader.tsx` |
| SCSS 모듈 파일       | PascalCase + `.module.scss` | `LoginButton.module.scss`     |
| 타입 파일            | 소문자 시작 카멜케이스      | `home.ts`                     |
| 유틸/훅 파일         | 소문자 또는 `use` 접두사    | `auth.ts`, `useToggle.ts`     |
| API 파일             | PascalCase + `Api` 접미사   | `HomeApi.ts`                  |
| Redux Slice          | 카멜케이스                  | `themeSlice.ts`               |
| 이미지/아이콘 파일명 | snake_case                  | `login_icon.svg`              |

---

### 🎨 스타일링

- SCSS 모듈화: 각 컴포넌트 전용 스타일은 `.module.scss`로 작성
- 전역 스타일은 `styles/` 내에서 관리
- 재사용 가능한 변수, 믹스인은 `styles/_variables.scss` 등으로 분리

---

### 📦 Assets 관리

- **SVG 아이콘**: `assets/icons/`에 저장
- **이미지**: `assets/images/`에 저장
- `index.ts`를 활용한 일괄 export 권장

```ts
// assets/index.ts
export { default as home } from "./icons/home.svg";
```

---

## 👾 Git Convention

### 💬 커밋 메시지 타입 : `타입 정의: 메시지`

```
feat / 새로운 기능에 대한 커밋
fix / 버그 수정에 대한 커밋
style / 코드 포멧팅 커밋
refactor / 코드 리펙토링
docs / 주석 추가, ReadMe 수정
test / 테스트 코드
chore / 기타 등등
```

---

### 🏷️ 브랜치 네이밍

**📌 기본 형식**

```
<type>/<scope>/<description>
```

**📌 규칙 상세**

| 항목        | 설명                                     |
| ----------- | ---------------------------------------- |
| type        | 작업 유형 (아래 명시된 세 가지 중 선택)  |
| scope       | fe (프론트엔드) 또는 be (백엔드)         |
| description | 작업 목적을 소문자로 작성, -로 단어 구분 |

**📌허용되는 타입**

| 타입     | 설명             |
| -------- | ---------------- |
| feat     | 새로운 기능 개발 |
| fix      | 버그 수정        |
| refactor | 리팩토링 작업    |

```
feat/fe/home-container       // 프론트 홈 컨테이너 기능 추가
fix/be/login-token           // 백엔드 로그인 토큰 버그 수정
refactor/fe/use-modal-hook   // 프론트 useModal 훅 리팩토링
```
