import style from "../../../styles/SelectType.module.scss";
import { search, map_pin } from "../../../assets/index";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setSearchType } from "../../../store/searchTypeSlice";
import type { ActiveType } from "../../../types/map";

const SelectType = () => {
  const [type, setType] = useState<ActiveType>({ search: true, pin: false });
  const dispatch = useDispatch();

  const clickEvent = (type: string) => {
    if (type === "search") {
      setType({ search: true, pin: false });
    } else {
      setType({ search: false, pin: true });
    }
    dispatch(setSearchType(type));
  };
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
