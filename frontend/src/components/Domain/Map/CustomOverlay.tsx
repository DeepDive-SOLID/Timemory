import { useNavigate } from "react-router-dom";
import style from "../../../styles/CustomOverlay.module.scss";
import type { CustomOverlayProps } from "../../../types/map";

const CustomOverlay = ({ img }: CustomOverlayProps) => {
  const navigate = useNavigate();
  const clickEvent = () => {
    // 프론트 연결 시 변경
    navigate("/");
  };
  return (
    <div className={style.customOverlay} onClick={() => clickEvent()}>
      <img src={img} className={style.imgBox}></img>
    </div>
  );
};

export default CustomOverlay;
