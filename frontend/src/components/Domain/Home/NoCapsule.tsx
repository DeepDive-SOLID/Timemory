import { capsule_img } from "../../../assets/index";
import style from "../../../styles/Capsule.module.scss";
import StartButton from "../../UI/StartButton";
import HomeImg from "./HomeImg";
import HeaderWithAlarm from "./HeaderWithAlarm";
import { useNavigate } from "react-router-dom";

const NoCapsule = () => {
  const navigate = useNavigate();

  return (
    <>
      <HeaderWithAlarm
        title={
          <>
            <span style={{ color: "#5497ff" }}>오늘의 캡슐</span>을
            <br />
            생성해주세요
          </>
        }
      />
      <HomeImg img={capsule_img} alt='메인 이미지' className={style.imgBox} />
      <div className={style.buttonBox}>
        <StartButton onClick={() => navigate("/")} className={style.button} />
      </div>
    </>
  );
};

export default NoCapsule;
