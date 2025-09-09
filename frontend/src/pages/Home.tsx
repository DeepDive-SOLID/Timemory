import NoCapsule from "../components/Domain/Home/NoCapsule";
import TabBar from "../components/APP/TabBar";
import HasCapsule from "../components/Domain/Home/HasCapsule";
import { useContext, useEffect, useState } from "react";
import type { HomeAlarm } from "../types/home";
import { getAlarmsApi } from "../api/alarm";
import { AuthContext } from "../contexts/AuthContext";
import { AlarmContext } from "../contexts/AlarmContext";

// api 요청 후 수정 예정
const Home = () => {
  const [data, setData] = useState<HomeAlarm[]>([]);
  const { userInfo } = useContext(AuthContext)!;
  useEffect(() => {
    if (data.length !== 0) return;
    const fetchAlarm = async () => {
      try {
        const res = await getAlarmsApi(userInfo?.memberId);
        setData(res);
      } catch (e) {
        console.error("Error : " + e);
      }
    };
    if (userInfo) fetchAlarm();
  }, [userInfo, setData]);
  return (
    <AlarmContext.Provider value={{ data }}>
      <>
        {/* 캡슐이 하나라도 안열렸으면 캡슐 열리는 컴포넌트 렌더링 */}
        {data.some((item) => !item.capOpen) ? <HasCapsule /> : <NoCapsule />}

        <TabBar />
      </>
    </AlarmContext.Provider>
  );
};

export default Home;
