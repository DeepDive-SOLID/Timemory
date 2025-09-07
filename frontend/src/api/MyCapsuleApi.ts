import api from "./axios";
import type { Capsule, CapsuleSpaceResponse } from "../types/capsule";

// 이미지 URL을 완전한 URL로 변환하는 함수
const convertImageUrl = (imageUrl: string | null): string | null => {
  if (!imageUrl) return null;

  // 이미 완전한 URL인 경우 (http:// 또는 https://로 시작)
  if (imageUrl.startsWith("http://") || imageUrl.startsWith("https://")) {
    return imageUrl;
  }

  // 상대 경로인 경우 백엔드 서버의 완전한 URL로 변환
  // 백엔드의 FileManager.getFileUrl()과 동일한 로직
  // 8080 포트 직접 접근
  return `http://localhost:8080/solid${imageUrl}`;
};

// 사용자의 모든 캡슐 조회
export const getUserCapsulesApi = async (): Promise<CapsuleSpaceResponse> => {
  try {
    const response = await api.get<CapsuleSpaceResponse>("/capsule-space");

    // 이미지 URL 변환 처리
    const processedData = {
      ...response.data,
      capsules: response.data.capsules.map((capsule) => ({
        ...capsule,
        imageUrl: convertImageUrl(capsule.imageUrl),
      })),
    };

    return processedData;
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

// LOCATION 타입 캡슐만 필터링하는 헬퍼 함수
export const filterLocationCapsules = (capsules: Capsule[]): Capsule[] => {
  return capsules.filter((capsule) => capsule.capsuleType === "LOCATION");
};
