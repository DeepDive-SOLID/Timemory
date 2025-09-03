import style from "../../../styles/MapCapsule.module.scss";
import { map } from "../../../assets/index";
import { map_pin_white } from "../../../assets/index";
import { useNavigate } from "react-router-dom";

interface MapCapsuleProps {
  groupId: string | undefined;
}

const MapCapsule = ({ groupId }: MapCapsuleProps) => {
  const navigate = useNavigate();
  const clickEvent = () => {
    navigate(`/capsuleMap/${groupId}`);
  };
  return (
    <div className={style.wrapper}>
      <h2>LOCATION CAPSULE</h2>
      <div className={style.mapBox}>
        <img className={style.img} src={map} alt='지도' />
        <button className={style.mapButton} onClick={() => clickEvent()}>
          <img src={map_pin_white} alt='' />
          확인하기
        </button>
      </div>
    </div>
  );
};

export default MapCapsule;
