export interface MypageDto {
  memberName: string;
  memberNickname: string;
  memberEmail: string;
  memberPhone: string;
  memberBirth: string;
  memberImg: string;
}

export interface MypageUpdDto {
  memberId: string;
  memberName: string;
  memberEmail: string;
  memberPhone: string;
  memberBirth: string;
  memberProfile: File | null;
}
