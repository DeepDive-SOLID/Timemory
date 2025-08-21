// condition 조건
export interface CapsuleCndtDto {
  teamId: number;
  memberId: string;
  capText: string;
  capEt: string;
  capImg: File;
  capTag: string;
  capCndtCase: string;
}

export interface CapsuleListDto {
  capId: number;
  teamId: number;
  memberId: string;
  capText: string;
  capUt: string;
  capEt: string;
  capImg: string;
  capTag: string;
  capOpen: boolean;
  capCndtCase: string;
}

// date 날짜
export interface CapsuleDateDto {
  teamId: number;
  memberId: string;
  capText: string;
  capEt: string;
  capImg: File;
  capTag: string;
}
