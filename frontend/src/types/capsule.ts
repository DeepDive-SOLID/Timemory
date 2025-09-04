export interface Capsule {
    capsuleId: number;
    content: string;
    imageUrl: string | null;
    tag: string;
    openDate: string;
    createdAt: string;
    isOpened: boolean;
    isAnniversary: boolean;
    capsuleType: "DATE" | "LOCATION" | "CONDITION" | "ANNIVERSARY";
    teamId: number;
    teamName: string;
}

export interface CapsuleSpaceResponse {
    memberId: string;
    memberNickname: string;
    totalCapsules: number;
    capsules: Capsule[];
}

export interface MessageCard {
    id: number;
    message: string;
    hashtags: string[];
    author: string;
    createdDate: string;
    image: string;
    isOpened: boolean;
}
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

export interface CapsuleCndtListDto {
    capId: number;
    teamId: number;
    memberId: string;
    memberNickname: string;
    capText: string;
    capUt: string;
    capEt: string;
    capImg: string;
    capTag: string;
    capOpen: boolean;
    capCndtCase: string;
}

export interface CapsuleDateListDto {
    capId: number;
    teamId: number;
    memberId: string;
    memberNickname: string;
    capText: string;
    capUt: string;
    capEt: string;
    capImg: string;
    capTag: string;
    capOpen: boolean;
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
