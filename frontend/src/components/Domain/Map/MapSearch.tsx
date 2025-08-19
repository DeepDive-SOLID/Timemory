import React, { useState } from "react";
import style from "../../../styles/MapSearch.module.scss";
import { search } from "../../../assets/index";
import { kakao_logo } from "../../../assets/index";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../../store";
import { getAddressForInput } from "./geocoder";

const MapSearch = () => {
  const [inputData, setInputData] = useState<string>("");
  const searchType = useSelector((state: RootState) => state.searchType.searchType);
  const dispatch = useDispatch();

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
        <img src={kakao_logo} alt='로고' />
      </div>
      <input className={style.input} type='text' onChange={(e) => inputEvent(e)} onKeyDown={(e) => keyEvent(e)} />
      <button className={style.button}>
        <img src={search} alt='검색 버튼' onClick={() => submitEvent()} />
      </button>
    </div>
  ) : (
    <div className={style.pinBox}>원하는 곳을 핀으로 찍으세요 !</div>
  );
};

export default MapSearch;
