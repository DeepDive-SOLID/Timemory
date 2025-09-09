import type { CapsuleCndtOpenDto, CapsuleDateOpenDto, CapsuleLtOpenDto } from "../types/openCapsule";
import api from "./axios";

export const getCapsuleLtListApi = async (capId: number) => {
  const res = await api.post<CapsuleLtOpenDto>("/capsule/open/lt", capId);
  return res.data;
};

export const getCapsuleDateListApi = async (capId: number) => {
  const res = await api.post<CapsuleDateOpenDto[]>("/capsule/open/date", capId);
  return res.data;
};

export const getCapsuleCndtListApi = async (capId: number) => {
  const res = await api.post<CapsuleCndtOpenDto>("/capsule/open/cndt", capId);
  return res.data;
};
