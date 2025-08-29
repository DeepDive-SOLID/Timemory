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
