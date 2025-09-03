// hooks.ts
import { useDispatch, useSelector } from "react-redux";
import type { TypedUseSelectorHook } from "react-redux";
import type { RootState, AppDispatch } from "../store/index"; // store.ts에서 정의한 타입 가져오기

// useDispatch의 타입
export const useAppDispatch: () => AppDispatch = useDispatch;

// useSelector의 타입
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
