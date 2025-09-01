import axios from "axios";
import api from "./axios.ts";

import type {
  CapsuleCndtDto,
  CapsuleListDto,
  CapsuleDateDto,
  CapsuleDetailDto,
} from "../types/capsule";

// 캡슐 상세 조회
export const capsuleDetailApi = async (capsuleId: number): Promise<CapsuleDetailDto> => {
  try {
    const res = await api.post<CapsuleDetailDto>("/capsule/detail", capsuleId);
    return res.data;
  } catch {
    throw new Error("캡슐 조회중 오류가 발생했습니다.");
  }
};

// 캡슐 리스트 조회
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
