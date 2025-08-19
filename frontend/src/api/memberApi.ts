import api from "./axios";
import type { MemberResponseDto } from "../types/member";

// 닉네임 정확 매칭 검색
export const searchMemberByExactNickname = async (
  nickname: string
): Promise<MemberResponseDto | null> => {
  if (!nickname || !nickname.trim()) return null;
  const response = await api.get(`/members/search/exact`, {
    params: { nickname },
  });
  return response.data as MemberResponseDto;
};

// memberId로 사용자 프로필 조회
export const getMemberById = async (
  memberId: string
): Promise<MemberResponseDto> => {
  const response = await api.get(`/members/${memberId}`);
  return response.data as MemberResponseDto;
};
