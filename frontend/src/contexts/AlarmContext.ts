// contexts/AlarmContext.tsx
import { createContext, useContext } from "react";
import type { AlarmDto } from "../types/home";

interface AlarmContextProps {
  data: AlarmDto[];
  setData: (d: AlarmDto[]) => void;
}

export const AlarmContext = createContext<AlarmContextProps | null>(null);

export const useAlarm = () => {
  const ctx = useContext(AlarmContext);
  if (!ctx) throw new Error("useAlarm must be used within AlarmProvider");
  return ctx;
};
