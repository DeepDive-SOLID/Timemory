import type { CapsuleCndtDto, CapsuleDateDto, CapsuleCndtListDto, CapsuleDateListDto } from "../types/capsule";
import api from "./axios";

// 캡슐 조건 조회
export const CapsuleCndtListApi = async (teamId: number): Promise<CapsuleCndtListDto[]> => {
  try {
    const res = await api.post<CapsuleCndtListDto[]>("/capsule/cndt/list", teamId, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res.data;
  } catch (error) {
    console.error("캡슐 리스트 조회 실패:", error);
    throw error;
  }
};

// 캡슐 날짜 조회
export const CapsuleDateListApi = async (teamId: number): Promise<CapsuleDateListDto[]> => {
  try {
    const res = await api.post<CapsuleDateListDto[]>("/capsule/date/list", teamId, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res.data;
  } catch (error) {
    console.error("캡슐 리스트 조회 실패:", error);
    throw error;
  }
};

// 조건 캡슐 생성

export const CapsuleCndtCreateApi = async (dto: CapsuleCndtDto): Promise<string> => {
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

    const res = await api.post<string>("/capsule/cndt/create", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data;
  } catch (error) {
    console.error("조건 캡슐 생성 실패:", error);
    throw error;
  }
};

// 날짜 캡슐 생성
export const CapsuleDateCreateApi = async (dto: CapsuleDateDto): Promise<string> => {
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

    const res = await api.post<string>("/capsule/date/create", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data;
  } catch (error) {
    console.error("날짜 캡슐 생성 실패:", error);
    throw error;
  }
};
