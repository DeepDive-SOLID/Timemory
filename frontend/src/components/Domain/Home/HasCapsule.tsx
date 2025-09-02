import { capsule_img } from "../../../assets/index";
import style from "../../../styles/Capsule.module.scss";
import HomeImg from "./HomeImg";
import HeaderWithAlarm from "./HeaderWithAlarm";

const HasCapsule = () => {
  return (
    <>
      <HeaderWithAlarm
        title={
          <>
            캡슐의 움직임이
            <br />
            달라졌어요 !
          </>
        }
      />
      <p style={{ color: "#e86a5a" }}>캡슐을 터치해보세요</p>
      <HomeImg img={capsule_img} alt='메인 이미지' className={`${style.imgBox} ${style.noCapsuleImg}`} />
    </>
  );
};

export default HasCapsule;
