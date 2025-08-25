import { useState } from "react";
import { capsule_img, bell } from "../../../assets/index";
import style from "../../../styles/Capsule.module.scss";
import HomeImg from "./HomeImg";
import AlarmModal from "./AlarmModal";
import Notification from "./Notification";

const HasCapsule = () => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const clickEvent = () => {
    setModalOpen((prev) => !prev);
  };
  return (
    <>
      <div className={style.titleBox}>
        <h1>
          캡슐의 움직임이
          <br />
          달라졌어요 !
        </h1>
        <HomeImg img={bell} alt={"알람"} className={style.imgBox} onClick={() => clickEvent()} />
        <AlarmModal modalOpen={modalOpen} setModalOpen={setModalOpen} />
        <Notification />
      </div>
      <p style={{ color: "#e86a5a" }}>캡슐을 터치해보세요</p>

      <HomeImg img={capsule_img} alt={"메인 이미지"} className={`${style.imgBox} ${style.noCapsuleImg}`} />
    </>
  );
};

export default HasCapsule;
