import api from "./axios.ts";
import type { MypageDto, MypageUpdDto } from "../types/mypage";

/* 회원 정보 조회 */
export const getMemberDto = async (memberId: string): Promise<MypageDto> => {
  try {
    const res = await api.post<MypageDto>(
      "/api/mypage/getMemberDto",
      memberId,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return res.data;
  } catch (error) {
    console.error("회원 정보 조회 실패:", error);
    throw error;
  }
};

/* 회원 정보 수정 */
export const updateMemberDto = async (dto: MypageUpdDto): Promise<string> => {
  try {
    const formData = new FormData();
    formData.append("memberId", dto.memberId);
    formData.append("memberName", dto.memberName);
    formData.append("memberEmail", dto.memberEmail);
    formData.append("memberPhone", dto.memberPhone);
    formData.append("memberBirth", dto.memberBirth);
    if (dto.memberProfile) {
      formData.append("memberProfile", dto.memberProfile);
    }

    const res = await api.put<string>("/api/mypage/updateMemberDto", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data;
  } catch (error) {
    console.error("회원 정보 수정 실패:", error);
    throw error;
  }
};

/* 회원 정보 삭제 */
export const deleteMemberDto = async (memberId: string): Promise<string> => {
  try {
    const res = await api.request<string>({
      url: "/api/mypage/deleteMemberDto",
      method: "DELETE",
      data: memberId,
      headers: { "Content-Type": "application/json" },
    });
    return res.data;
  } catch (error) {
    console.error("회원 정보 삭제 실패:", error);
    throw error;
  }
};
