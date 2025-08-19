export interface Group {
  id: number;
  name: string;
  memberCount?: number;
  date?: string;
  members: string[];
  profiles?: string[];
}

// API 응답 타입들
export interface MemberProfileDto {
  memberId: string;
  nickname: string;
  profileImg: string;
}

export interface TeamResponseDto {
  teamId: number;
  teamName: string;
  memberCount: number;
  members: MemberProfileDto[];
}

// 팀 생성 요청 DTO
export interface TeamCreateRequestDto {
  teamName: string;
  inviteNicknames: string[];
}

// 팀 수정 요청 DTO
export interface TeamRequestDto {
  teamName?: string;
}
