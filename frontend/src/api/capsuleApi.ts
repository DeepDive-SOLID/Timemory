import api from "./axios";
import type { Capsule, CapsuleSpaceResponse } from "../types/capsule";

// 사용자의 모든 캡슐 조회
export const getUserCapsulesApi = async (): Promise<CapsuleSpaceResponse> => {
  try {
    const response = await api.get<CapsuleSpaceResponse>("/capsule-space");
    return response.data;
  } catch (error: unknown) {
    const axiosError = error as {
      response?: { status?: number; data?: { errorCode?: string } };
    };
    if (axiosError.response?.status === 404) {
      if (axiosError.response?.data?.errorCode === "MEMBER_NOT_FOUND") {
        throw new Error("존재하지 않는 회원입니다.");
      } else if (axiosError.response?.data?.errorCode === "CAPSULE_NOT_FOUND") {
        throw new Error("캡슐을 찾을 수 없습니다.");
      }
    } else if (axiosError.response?.status === 403) {
      throw new Error("권한이 없습니다.");
    }
    throw new Error("캡슐 조회 중 오류가 발생했습니다.");
  }
};

// 특정 캡슐 삭제
export const deleteCapsuleApi = async (capsuleId: number): Promise<void> => {
  try {
    await api.delete(`/capsule-space/${capsuleId}`);
  } catch (error: unknown) {
    const axiosError = error as {
      response?: { status?: number; data?: { errorCode?: string } };
    };

    if (axiosError.response?.status === 404) {
      if (axiosError.response?.data?.errorCode === "CAPSULE_NOT_FOUND") {
        throw new Error("삭제할 캡슐을 찾을 수 없습니다.");
      }
    } else if (axiosError.response?.status === 403) {
      if (axiosError.response?.data?.errorCode === "AUTH_001") {
        throw new Error("권한이 없습니다. (캡슐 작성자가 아님)");
      }
      throw new Error("권한이 없습니다.");
    }
    throw new Error("캡슐 삭제 중 오류가 발생했습니다.");
  }
};

// DATE 타입 캡슐만 필터링하는 헬퍼 함수
export const filterDateCapsules = (capsules: Capsule[]): Capsule[] => {
  return capsules.filter((capsule) => capsule.capsuleType === "DATE");
};
