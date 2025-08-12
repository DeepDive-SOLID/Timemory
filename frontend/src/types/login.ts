export interface KakaoLoginDto {
    memberId: string;
    memberNickname: string | null;
}

export interface CheckNicknameDto {
    memberId: string;
    memberNickname: string;
}