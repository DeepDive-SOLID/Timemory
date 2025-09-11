import Kakao from "../components/Domain/Map/Kakao";
import style from "../styles/Back.module.scss";
import useMyCapsuleData from "../hooks/useMyCapsuleData";
import { back_arrow } from "../assets";
import { useNavigate } from "react-router-dom";

const MyCapsuleMap = () => {
  const navigate = useNavigate();

  const data = useMyCapsuleData({
    groupId: undefined,
    customParam: undefined,
  });

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <>
      <div className={style.backBox} onClick={handleBackClick}>
        <img src={back_arrow} alt="뒤로가기" />
      </div>
      <Kakao customProps={data} showDeleteButton={true} />
    </>
  );
};

export default MyCapsuleMap;
