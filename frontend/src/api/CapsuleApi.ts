import axios from "axios";
import type {
  CapsuleCndtDto,
  CapsuleListDto,
  CapsuleDateDto,
} from "../types/capsule";

// 캡슐 조회
export const CapsuleListApi = async (
  teamId: number
): Promise<CapsuleListDto[]> => {
  try {
    const res = await axios.post<CapsuleListDto[]>(
      "/api/capsule/cndt/list",
      teamId,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return res.data;
  } catch (error) {
    console.error("캡슐 리스트 조회 실패:", error);
    throw error;
  }
};

// 조건 캡슐 생성

export const CapsuleCndtCreateApi = async (
  dto: CapsuleCndtDto
): Promise<string> => {
  try {
    const formData = new FormData();
    formData.append("teamId", dto.teamId.toString());
    formData.append("memberId", dto.memberId);
    formData.append("capText", dto.capText);
    formData.append("capEt", dto.capEt);
    if (dto.capImg) {
      formData.append("capImg", dto.capImg);
    }
    formData.append("capTag", dto.capTag);
    formData.append("capCndtCase", dto.capCndtCase);

    const res = await axios.post<string>("/api/capsule/cndt/create", formData);
    return res.data;
  } catch (error) {
    console.error("조건 캡슐 생성 실패:", error);
    throw error;
  }
};

// 조건 캡슐 삭제
export const CapsuleCndtDelApi = async (capId: number): Promise<string> => {
  try {
    const res = await axios.delete<string>("/api/capsule/cndt/delete", {
      data: capId,
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res.data;
  } catch (error) {
    console.error("캡슐 삭제 실패:", error);
    throw error;
  }
};

// 날짜 캡슐 생성
export const CapsuleDateCreateApi = async (
  dto: CapsuleDateDto
): Promise<string> => {
  try {
    const formData = new FormData();
    formData.append("teamId", dto.teamId.toString());
    formData.append("memberId", dto.memberId);
    formData.append("capText", dto.capText);
    formData.append("capEt", dto.capEt);
    if (dto.capImg) {
      formData.append("capImg", dto.capImg);
    }
    formData.append("capTag", dto.capTag);

    const res = await axios.post<string>("/api/capsule/date/create", formData);
    return res.data;
  } catch (error) {
    console.error("날짜 캡슐 생성 실패:", error);
    throw error;
  }
};

// 날짜 캡슐 삭제
export const CapsuleDateDelApi = async (capId: number): Promise<string> => {
  try {
    const res = await axios.delete<string>("/api/capsule/date/delete", {
      data: capId,
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res.data;
  } catch (error) {
    console.error("날짜 캡슐 삭제 실패:", error);
    throw error;
  }
};
