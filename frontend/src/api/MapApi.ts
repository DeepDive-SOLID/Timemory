import api from "./axios";
import type { LtAddDto, LtListDto } from "../types/map";

export const getLtListApi = async (teamId: number) => {
  console.log(teamId);
  const res = await api.post<LtListDto[]>("/capsule/lt/getLtList", teamId, {
    headers: { "Content-Type": "application/json" },
  });
  return res.data;
};

export const saveLtApi = async (ltDto: LtAddDto) => {
  const formData = new FormData();

  formData.append("teamId", `${ltDto.teamId}`);
  formData.append("memberId", ltDto.memberId);
  formData.append("capText", ltDto.capText);
  formData.append("capUt", ltDto.capUt);
  formData.append("capTag", ltDto.capTag);
  formData.append("capLtAddr", ltDto.capLtAddr);
  formData.append("capLtDetail", ltDto.capLtDetail);
  formData.append("capImg", ltDto.capImg);

  const res = await api.post("/capsule/lt/addLtDto", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return res.data;
};
