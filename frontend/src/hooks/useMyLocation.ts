import { useEffect, useState } from "react";
import type { Location } from "../types/map";

// 현재 내 위치를 가져오는 커스텀 훅
const useMyLocation = (watch: boolean = false): Location => {
  const [location, setLocation] = useState<Location>({ lat: 0, lng: 0 });

  useEffect(() => {
    if (!navigator.geolocation) {
      console.warn("Geolocation을 지원하지 않는 브라우저입니다.");
      setLocation({ lat: 37.483034, lng: 126.902435 }); // fallback 좌표
      return;
    }

    const success = (position: GeolocationPosition) => {
      setLocation({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
    };

    const error = () => {
      console.warn("위치 정보를 가져오지 못했습니다.");
      setLocation({
        lat: 37.483034,
        lng: 126.902435, // fallback 좌표
      });
    };

    // watch 여부에 따라 다르게 실행
    let watchId: number;
    if (watch) {
      watchId = navigator.geolocation.watchPosition(success, error, {
        enableHighAccuracy: true,
        maximumAge: 10000,
        timeout: 10000,
      });
    } else {
      navigator.geolocation.getCurrentPosition(success, error, {
        enableHighAccuracy: true,
        timeout: 10000,
      });
    }

    return () => {
      if (watch && watchId !== undefined) {
        navigator.geolocation.clearWatch(watchId);
      }
    };
  }, [watch]);

  return location;
};

export default useMyLocation;
