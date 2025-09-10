import type { AlarmDto } from "../types/home";
import api from "./axios";

export const getAlarmsApi = async (memberId: string | undefined) => {
  const res = await api.post<AlarmDto[]>("/alarm/list", memberId);
  return res.data;
};

export const deleteAlarmApi = async (alarmId: number) => {
  const res = await api.post("/alarm/del", alarmId);
  return res.data;
};
