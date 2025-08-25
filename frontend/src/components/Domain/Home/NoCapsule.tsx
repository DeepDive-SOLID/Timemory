import { useState } from "react";
import { capsule_img, bell } from "../../../assets/index";
import style from "../../../styles/Capsule.module.scss";
import StartButton from "../../UI/StartButton";
import AlarmModal from "../../../components/Domain/Home/AlarmModal";
import HomeImg from "../../../components/Domain/Home/HomeImg";
import Notification from "../../../components/Domain/Home/Notification";
import { useNavigate } from "react-router-dom";
const NoCapsule = () => {
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const clickEvent = (type: string) => {
    if (type === "img") {
      setModalOpen((prev) => !prev);
    } else {
      // 프론트 연동 시 변경
      navigate("/");
    }
  };
  return (
    <>
      <div className={style.titleBox}>
        <h1>
          <span style={{ color: "#5497ff" }}>오늘의 캡슐</span>을
          <br />
          생성해주세요
        </h1>
        <HomeImg img={bell} alt={"알람"} className={style.imgBox} onClick={() => clickEvent("img")} />
        <AlarmModal modalOpen={modalOpen} setModalOpen={setModalOpen} />
        <Notification />
      </div>
      <HomeImg img={capsule_img} alt={"메인 이미지"} className={style.imgBox} />
      <div className={style.buttonBox}>
        <StartButton onClick={() => clickEvent("button")} className={style.button} />
      </div>
    </>
  );
};

export default NoCapsule;
