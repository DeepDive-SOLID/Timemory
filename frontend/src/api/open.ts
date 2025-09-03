import type { CapsuleLtOpenDto } from "../types/openCapsule";
import api from "./axios";

export const getCapsuleLtListApi = async (capId: number) => {
  const res = await api.post<CapsuleLtOpenDto>("/capsule/open/lt", capId);
  return res.data;
};
