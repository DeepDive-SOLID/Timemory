import style from "../../../styles/SelectType.module.scss";
import { search, map_pin } from "../../../assets/index";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSearchType } from "../../../store/searchTypeSlice";
import type { ActiveType } from "../../../types/map";
import type { RootState } from "../../../store";

const SelectType = () => {
  const [type, setType] = useState<ActiveType>({ search: true, pin: false });
  const searchType = useSelector((state: RootState) => state.searchType.searchType);
  const dispatch = useDispatch();

  const clickEvent = (type: string) => {
    setType(type === "search" ? { search: true, pin: false } : { search: false, pin: true });
    dispatch(setSearchType(type));
  };

  useEffect(() => {
    setType(searchType === "search" ? { search: true, pin: false } : { search: false, pin: true });
  }, [searchType]);
  return (
    <div className={style.typeBox}>
      <button className={`${style.searchBox} ${type.search && style.active}`} onClick={() => clickEvent("search")}>
        <img src={search} alt='검색' className={style.img} />
      </button>
      <button className={`${style.pinBox} ${type.pin && style.active}`} onClick={() => clickEvent("pin")}>
        <img src={map_pin} alt='핀' className={style.img} />
      </button>
    </div>
  );
};

export default SelectType;
