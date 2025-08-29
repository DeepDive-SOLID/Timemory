export interface OpenCapsuleAddDto {
  teamId: number;
  memberId: string;
  capText: string;
  capUt: string;
  capImg: File;
  capTag: string;
}

export interface OpenCapsuleListDto {
  capText: string;
  capUt: string;
  memberNickname: string;
}

export interface OpenListDto {
  annName: string;
  annDt: number;
  teamId: number;
  memberProfiles: (string | null)[];
}
