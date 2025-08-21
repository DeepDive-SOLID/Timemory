import style from "../../../styles/Back.module.scss";
import { back_arrow } from "../../../assets/index";
import { useNavigate } from "react-router-dom";

const Back = () => {
  const navigate = useNavigate();

  const clickEvent = () => {
    // 프론트 연동 시 변경
    navigate("/");
  };
  return (
    <div className={style.backBox} onClick={() => clickEvent()}>
      <img src={back_arrow} alt='' />
    </div>
  );
};

export default Back;
