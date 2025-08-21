import type { CheckNicknameDto, KakaoLoginDto } from "../types/login.ts";
import api from "./axios.ts";


// 카카오 로그인
export const loginKakaoApi = async (code: string): Promise<KakaoLoginDto> => {
    const res = await api.get(`/login/kakao?code=${code}`);
    return res.data as KakaoLoginDto;
};

// 로그인
export const loginApi = async (memberId: string): Promise<string> => {
    try {
        const res = await api.post("/login", memberId);
        return res.data as string;
    } catch {
        throw new Error("로그인 중 오류가 발생했습니다.");
    }
}

// 닉네임 중복확인
export const checkNicknameApi = async (CheckNicknameDto: CheckNicknameDto): Promise<boolean> => {
    try {
        const res = await api.post("/login/checkNickname", CheckNicknameDto);
        return res.data as boolean;
    } catch {
        throw new Error("ID 중복확인 중 오류가 발생했습니다.");
    }
};

// 토큰 재발급
export const refreshTokenApi = async (): Promise<string> => {
    const res = await api.post("/token/refresh");
    return res.data as string; // 새로운 access token 반환
};


// 로그아웃
export const logoutApi = async (): Promise<void> => {
    await api.post("/login/logout");
};