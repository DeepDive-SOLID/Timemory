import type { AlarmDto } from "../types/home";
import api from "./axios";

export const getAlarmsApi = async (memberId: string | undefined) => {
  const res = await api.post<AlarmDto[]>("/alarm/list", memberId);
  return res.data;
};
