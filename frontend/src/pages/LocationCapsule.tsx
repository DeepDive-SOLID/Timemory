import Kakao from "../components/Domain/Map/Kakao";
import style from "../styles/Back.module.scss";
import useCapsuleData from "../hooks/useCapsuleData";
import ImgBox from "../components/Domain/Map/ImgBox";
import { back_arrow } from "../assets";
import { useParams } from "react-router-dom";

const LocationCapsule = () => {
  // 컴포넌트에 필요한 데이터를 요청하는 커스텀 훅
  const { groupId } = useParams<{ groupId: string }>();
  const data = useCapsuleData({ groupId });

  return (
    <>
      {/* 뒤로가기 back_arrow */}
      <ImgBox img={back_arrow} className={style.backBox} url='group' alt='뒤로가기' groupId={groupId} />
      <Kakao customProps={data} />
    </>
  );
};

export default LocationCapsule;
