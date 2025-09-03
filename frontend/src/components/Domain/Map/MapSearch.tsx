import React, { useState } from "react";
import style from "../../../styles/MapSearch.module.scss";
import { search } from "../../../assets/index";
import { kakao_logo_white } from "../../../assets/index";
import { getAddressForInput } from "./geocoder";
import { useAppDispatch, useAppSelector } from "../../../hooks/hooks";

const MapSearch = () => {
  const [inputData, setInputData] = useState<string>("");

  // redux를 통한 상태관리
  const searchType = useAppSelector((state) => state.searchType.searchType);
  const dispatch = useAppDispatch();

  const inputEvent = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputData(e.target.value);
  };
  const keyEvent = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      submitEvent();
    }
  };

  const submitEvent = () => {
    try {
      getAddressForInput({ inputData, dispatch });
    } catch (e) {
      console.log(e);
    }
  };
  return searchType === "search" ? (
    <div className={style.searchBox}>
      <div className={style.searchLogo}>
        <img src={kakao_logo_white} alt='로고' />
      </div>
      <input className={style.input} type='text' onChange={(e) => inputEvent(e)} onKeyDown={(e) => keyEvent(e)} placeholder='원하는 주소를 검색하세요 !' />
      <button className={style.button}>
        <img src={search} alt='검색 버튼' onClick={() => submitEvent()} />
      </button>
    </div>
  ) : (
    <div className={style.pinBox}>원하는 곳을 핀으로 찍으세요 !</div>
  );
};

export default MapSearch;
