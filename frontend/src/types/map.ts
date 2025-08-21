import type { Dispatch } from "@reduxjs/toolkit";

export interface LtListDto {
  lat?: number;
  lng?: number;
  capId: number;
  teamId: number;
  memberId: string;
  capText: string;
  capUt: string;
  capEt: string;
  capImg: string;
  capTag: string;
  capOpen: string;
  capLtId: string;
  capLtAddr: string;
  capLtDetail: string;
}

export interface CustomOverlayProps {
  img: string;
}

export interface InputProps {
  inputData: string;
  dispatch: Dispatch;
}
export interface LatLngProps {
  lat: number;
  lng: number;
  dispatch: Dispatch;
}

export interface ActiveType {
  search: boolean;
  pin: boolean;
}
export interface UseLatLngProps {
  input: string[];
}
export interface Location {
  lat: number;
  lng: number;
  addr?: string;
}

export interface KakaoProps {
  customProps?: LtListDto[];
}
