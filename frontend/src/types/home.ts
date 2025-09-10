export interface AlarmDto {
  teamName: string;
  capOpen: boolean;
  capId: number;
  alarmId: number;
}

export interface AlarmModalProps {
  modalOpen: boolean;
  setModalOpen: (check: boolean) => void;
}
