import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../../store";
import style from "../../../styles/SearchInfo.module.scss";
import { setCheck } from "../../../store/locationSlice";
import { useNavigate } from "react-router-dom";

const SearchInfo = () => {
  const address = useSelector((state: RootState) => state.location.address_name);
  const buildingName = useSelector((state: RootState) => state.location.building_name);
  const check = useSelector((state: RootState) => state.location.check);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const clickEvent = (e: React.MouseEvent<HTMLButtonElement>) => {
    dispatch(setCheck(false));
    if (e.currentTarget.innerText === "위치 결정") {
      // 프론트 합치면 변경
      navigate("/capsuleMap");
    }
  };

  return (
    <>
      {check && address ? (
        <div className={style.info}>
          <div>
            <h2 className={style.title}>{buildingName ? buildingName : "추억을 기록해보세요"}</h2>
          </div>
          <div className={style.address}>{address}</div>
          <div>
            <button className={style.button} onClick={(e) => clickEvent(e)}>
              위치 결정
            </button>
          </div>
          {/* 나중에 x svg 가져오면 변경 */}
          <button className={style.cancel} onClick={(e) => clickEvent(e)}>
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
