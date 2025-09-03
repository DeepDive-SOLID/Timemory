export interface OpenCapsuleAddDto {
  teamId: number;
  memberId: string;
  capText: string;
  capEt: string;
  capUt: string;
  capImg: File;
  capTag: string;
}

export interface OpenCapsuleListDto {
  capText: string;
  capUt: string;
  memberNickname: string;
  capEt: string;
}

export interface OpenListDto {
  annName: string;
  annDt: number;
  teamId: number;
  memberProfiles: (string | null)[];
}
