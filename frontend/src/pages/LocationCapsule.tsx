import Kakao from "../components/Domain/Map/Kakao";
import style from "../styles/Back.module.scss";
import useCapsuleData from "../hooks/useCapsuleData";
import ImgBox from "../components/Domain/Map/ImgBox";
import { back_arrow } from "../assets";

const LocationCapsule = () => {
  // 컴포넌트에 필요한 데이터를 요청하는 커스텀 훅
  const data = useCapsuleData();
  return (
    <>
      {/* 임시 url */}
      {/* 뒤로가기 back_arrow */}
      <ImgBox img={back_arrow} className={style.backBox} url='groupInner' alt='뒤로가기' />
      <Kakao customProps={data} />
    </>
  );
};

export default LocationCapsule;
