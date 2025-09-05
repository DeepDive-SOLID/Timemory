import style from "../../../styles/SearchInfo.module.scss";
import { setCheck } from "../../../store/locationSlice";
import { useNavigate } from "react-router-dom";
import { setSearchType } from "../../../store/searchTypeSlice";
import { useAppDispatch, useAppSelector } from "../../../hooks/hooks";
import { useEffect } from "react";

const SearchInfo = () => {
  // redux를 통한 상태관리
  const address = useAppSelector((state) => state.location.address_name);
  const buildingName = useAppSelector((state) => state.location.building_name);
  const check = useAppSelector((state) => state.location.check);
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const clickEvent = (e: React.MouseEvent<HTMLButtonElement>) => {
    dispatch(setCheck(false));
    dispatch(setSearchType("search"));
    if (e.currentTarget.id === "submit") {
      navigate(-1);
    }
  };

  useEffect(() => {
    console.log(address);
  }, [address]);

  return (
    <>
      {check && address ? (
        <div className={style.info}>
          <div>
            <h2 className={style.title}>{buildingName ? buildingName : "추억을 기록해보세요"}</h2>
          </div>
          <div className={style.address}>{address}</div>
          <div>
            <button className={style.button} id='submit' onClick={(e) => clickEvent(e)}>
              위치 결정
            </button>
          </div>
          {/* 나중에 x svg 가져오면 변경 */}
          <button className={style.cancel} id='cancel' onClick={(e) => clickEvent(e)}>
            X
          </button>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default SearchInfo;
