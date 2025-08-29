import style from "../../../styles/SelectType.module.scss";
import { search, map_pin } from "../../../assets/index";
import { setSearchType } from "../../../store/searchTypeSlice";
import { useAppDispatch, useAppSelector } from "../../../hooks/hooks";

const SelectType = () => {
  // redux를 통한 상태관리
  const searchType = useAppSelector((state) => state.searchType.searchType);
  const dispatch = useAppDispatch();

  const clickEvent = (type: string) => {
    dispatch(setSearchType(type));
  };

  return (
    <div className={style.typeBox}>
      <button className={`${style.searchBox} ${searchType === "search" && style.active}`} onClick={() => clickEvent("search")}>
        <img src={search} alt='검색' className={style.img} />
      </button>
      <button className={`${style.pinBox} ${searchType === "pin" && style.active}`} onClick={() => clickEvent("pin")}>
        <img src={map_pin} alt='핀' className={style.img} />
      </button>
    </div>
  );
};

export default SelectType;
