// contexts/AlarmContext.tsx
import { createContext, useContext } from "react";
import type { HomeAlarm } from "../types/home";

interface AlarmContextProps {
  data: HomeAlarm[];
  handleLinkClick: (id: number) => void;
}

export const AlarmContext = createContext<AlarmContextProps | null>(null);

export const useAlarm = () => {
  const ctx = useContext(AlarmContext);
  if (!ctx) throw new Error("useAlarm must be used within AlarmProvider");
  return ctx;
};
