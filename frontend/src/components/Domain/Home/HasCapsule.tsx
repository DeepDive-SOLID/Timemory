import { capsule_img } from "../../../assets/index";
import style from "../../../styles/Capsule.module.scss";
import HomeImg from "./HomeImg";
import HeaderWithAlarm from "./HeaderWithAlarm";
import CapsuleAnimation from "./CapsuleAnimation";
import { useState } from "react";
import { getCapsuleDateListApi } from "../../../api/open";
import { useAlarm } from "../../../contexts/AlarmContext";
import type { CapsuleDateOpenDto } from "../../../types/openCapsule";

const HasCapsule = () => {
  const { data } = useAlarm();
  const [modal, setModal] = useState(false);
  const [openData, setOpenData] = useState<CapsuleDateOpenDto | null>(null);

  const clickEvent = async (e: React.MouseEvent<HTMLImageElement>) => {
    e.currentTarget.style.display = "none";
    setModal((prev) => !prev);

    try {
      const filter = data.filter((item) => item.capOpen === false);
      // 조건이 열리는 조건이 애매해 날짜만 해놓음
      const res = await getCapsuleDateListApi(filter[0].capId);
      setOpenData(res[0]);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className={style.wrapper}>
      <div className={style.statusBar}></div>

      {modal && openData && <CapsuleAnimation data={openData} />}

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
      <HomeImg img={capsule_img} alt='메인 이미지' className={`${style.capsuleBox} ${style.noCapsuleImg}`} onClick={(e) => clickEvent(e)} />
    </div>
  );
};

export default HasCapsule;
