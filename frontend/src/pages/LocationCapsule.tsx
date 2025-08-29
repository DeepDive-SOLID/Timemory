import Kakao from "../components/Domain/Map/Kakao";
import Back from "../components/Domain/Map/Back";
import useCapsuleData from "../hooks/useCapsuleData";

const LocationCapsule = () => {
  // 컴포넌트에 필요한 데이터를 요청하는 커스텀 훅
  const data = useCapsuleData();
  return (
    <>
      <Back />
      <Kakao customProps={data} />
    </>
  );
};

export default LocationCapsule;
