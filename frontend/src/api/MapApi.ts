import api from "./axios";
import type { LtAddDto, LtListDto } from "../types/map";

export const getLtListApi = async (teamId: number) => {
  const res = await api.post<LtListDto[]>("/capsule/lt/getLtList", teamId, {
    headers: { "Content-Type": "application/json" },
  });
  return res.data;
};

export const saveLtApi = async (ltDto: LtAddDto) => {
  const res = await api.post("/capsule/lt/addLtDto", ltDto);

  return res.data;
};
