import style from "../../../styles/MapCapsule.module.scss";
import { map } from "../../../assets/index";
import { map_pin } from "../../../assets/index";
import { useNavigate } from "react-router-dom";

const MapCapsule = () => {
  const navigate = useNavigate();
  const clickEvent = () => {
    navigate("/capsuleMap");
  };
  return (
    <div className={style.wrapper}>
      <h2>LOCATION CAPSULE</h2>
      <div className={style.mapBox}>
        <img className={style.img} src={map} alt='지도' />
        <button className={style.mapButton} onClick={() => clickEvent()}>
          <img src={map_pin} alt='' />
          확인하기
        </button>
      </div>
    </div>
  );
};

export default MapCapsule;
