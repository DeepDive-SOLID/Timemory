import { useEffect, useState } from "react";
import type { Location } from "../types/map";

// 현재 내 위치를 가져오는 커스텀 훅
const useLocation = () => {
  const [location, setLocation] = useState<Location>({ lat: 0, lng: 0 });

  const success = (position: GeolocationPosition) => {
    // 위치 정보를 성공적으로 가져왔을 때의 처리
    setLocation({
      lat: position.coords.latitude,
      lng: position.coords.longitude,
    });
  };
  const error = () => {
    // 위치 정보를 가져오는 데 실패했을 때의 처리
    setLocation({
      lat: 37.483034,
      lng: 126.902435,
    });
    console.log("위치 받기 실패");
  };
  useEffect(() => {
    if (navigator.geolocation) {
      // Geolocation API를 사용하여 현재 위치를 가져오기
      navigator.geolocation.getCurrentPosition(success, error);
    }
  }, []);
  return location;
};

export default useLocation;
