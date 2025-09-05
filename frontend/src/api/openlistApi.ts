import api from "./axios";
import type {
  OpenCapsuleAddDto,
  OpenCapsuleListDto,
  OpenListDto,
} from "../types/openlist";

// 오픈 그룹 리스트 조회
export const getOpenList = async (): Promise<OpenListDto[]> => {
  const response = await api.get("/open/getOpenList");
  return response.data as OpenListDto[];
};

// 특정 팀의 오픈 캡슐 리스트 조회
export const getOpenCapsuleList = async (
  teamId: number
): Promise<OpenCapsuleListDto[]> => {
  const response = await api.post("/open/getOpenCapsuleList", teamId, {
    headers: { "Content-Type": "application/json" },
  });
  return response.data as OpenCapsuleListDto[];
};

// 오픈 그룹 캡슐 추가
export const addOpenCapsuleDto = async (
  payload: OpenCapsuleAddDto
): Promise<"SUCCESS"> => {
  const fd = new FormData();
  fd.append("teamId", String(payload.teamId));
  fd.append("memberId", payload.memberId);
  fd.append("capText", payload.capText);
  fd.append("capEt", payload.capEt);
  fd.append("capUt", payload.capUt);
  if (payload.capImg) {
    fd.append("capImg", payload.capImg);
  }
  fd.append("capTag", payload.capTag);

  const response = await api.post("/open/addOpenCapsuleDto", fd, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return response.data as "SUCCESS";
};
