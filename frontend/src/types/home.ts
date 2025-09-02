export interface AlarmDto {
  teamName: string;
  capOpen: boolean;
  capId: number;
}

export interface HomeAlarm {
  teamName: string;
  capOpen: boolean;
  capId: number;
  click: boolean;
}

export interface AlarmModalProps {
  modalOpen: boolean;
  setModalOpen: (check: boolean) => void;
}
