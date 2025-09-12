import HomeImg from "./HomeImg";
import AlarmModal from "./AlarmModal";
import Notification from "./Notification";
import { useState } from "react";
import { bell } from "../../../assets/index";
import style from "../../../styles/Capsule.module.scss";

interface HeaderWithAlarmProps {
  title: React.ReactNode;
}

const HeaderWithAlarm = ({ title }: HeaderWithAlarmProps) => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className={style.titleBox}>
      <h1>{title}</h1>
      <HomeImg img={bell} alt='알람' className={style.imgBox} onClick={() => setModalOpen((prev) => !prev)} />
      <AlarmModal modalOpen={modalOpen} setModalOpen={setModalOpen} />
      <Notification />
    </div>
  );
};

export default HeaderWithAlarm;
