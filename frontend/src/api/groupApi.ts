import api from "./axios";
import type {
  TeamResponseDto,
  TeamCreateRequestDto,
  MemberProfileDto,
  TeamRequestDto,
} from "../types/group";

// 전체 팀 목록 조회 API (인증 불필요)
export const getAllTeams = async (): Promise<TeamResponseDto[]> => {
  const response = await api.get(`/teams`);
  return response.data as TeamResponseDto[];
};

// 사용자의 팀 목록 조회 API (JWT 토큰 기반)
export const getUserTeams = async (): Promise<TeamResponseDto[]> => {
  const response = await api.get(`/teams/my-teams`);
  return response.data as TeamResponseDto[];
};

// 팀 생성
export const createTeam = async (
  payload: TeamCreateRequestDto
): Promise<void> => {
  const token = localStorage.getItem("accessToken");
  await api.post(`/teams`, payload, {
    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
  });
};

// 특정 팀 상세 조회
export const getTeamById = async (teamId: number): Promise<TeamResponseDto> => {
  const response = await api.get(`/teams/${teamId}`);
  return response.data as TeamResponseDto;
};

// 팀 탈퇴 (JWT 토큰 기반, 본인만 가능)
export const leaveTeam = async (teamId: number): Promise<void> => {
  await api.delete(`/teams/${teamId}/leave`);
};

// 팀에 멤버 초대(닉네임으로 추가)
export const addTeamMember = async (
  teamId: number,
  nickname: string
): Promise<MemberProfileDto> => {
  const response = await api.post(`/teams/${teamId}/members`, { nickname });
  return response.data as MemberProfileDto;
};

// 팀 이름 수정
export const updateTeam = async (
  teamId: number,
  payload: TeamRequestDto
): Promise<TeamResponseDto> => {
  const response = await api.put(`/teams/${teamId}`, payload);
  return response.data as TeamResponseDto;
};
