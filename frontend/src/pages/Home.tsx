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
  const handleLinkClick = (id: number) => {
    setData((prevData) => prevData.map((item) => (item.capId === id ? { ...item, click: true } : item)));
  };
  useEffect(() => {
    const fetchAlarm = async () => {
      try {
        const res = await getAlarmsApi(userInfo?.memberId);
        const updatedData = res.map((item) => ({
          ...item,
          click: false, // 'click' 속성 추가
        }));
        setData(updatedData);
      } catch (e) {
        console.error("Error : " + e);
      }
    };
    if (userInfo) fetchAlarm();
  }, [userInfo, setData]);
  return (
    <AlarmContext.Provider value={{ data, handleLinkClick }}>
      <div>
        {true ? <HasCapsule /> : <NoCapsule />}
        <TabBar />
      </div>
    </AlarmContext.Provider>
  );
};

export default Home;
