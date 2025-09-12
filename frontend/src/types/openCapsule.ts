export interface CapsuleLtOpenDto {
  capId: number;
  teamId: number;
  memberId: string;
  memberNickname: string;
  capText: string;
  capUt: Date;
  capEt: Date;
  capImg: string;
  capTag: string;
  capOpen: boolean;
  capLtAddr: string;
  capLtDetail: string;
}

export interface CapsuleDateOpenDto {
  capId: number;
  teamId: number;
  memberId: string;
  memberNickname: string;
  capText: string;
  capUt: Date;
  capEt: Date;
  capImg: string;
  capTag: string;
  capOpen: boolean;
}

export interface CapsuleCndtOpenDto {
  capId: number;
  teamId: number;
  memberId: string;
  memberNickname: string;
  capText: string;
  capUt: Date;
  capEt: Date;
  capImg: string;
  capTag: string;
  capOpen: boolean;
  capCndtCase: string;
}
