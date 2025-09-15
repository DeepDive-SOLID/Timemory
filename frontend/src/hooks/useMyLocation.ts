import { useEffect, useState } from "react";
import type { Location } from "../types/map";

// IP 기반 fallback 함수
const getIpLocation = async (): Promise<Location> => {
  try {
    const ip = await fetch("https://geolocation-db.com/json/")
      .then((res) => res.json())
      .then((res) => res["IPv4"]);

    const geoData = await fetch(`http://ip-api.com/json/${ip}`).then((res) => res.json());

    return { lat: geoData.lat, lng: geoData.lon };
  } catch (e) {
    console.error("IP 기반 위치 조회 실패:", e);
    return { lat: 37.5665, lng: 126.978 }; // fallback (서울 시청)
  }
};

// 현재 내 위치를 가져오는 커스텀 훅
const useMyLocation = (watch: boolean = false): Location => {
  const [location, setLocation] = useState<Location>({ lat: 0, lng: 0 });

  useEffect(() => {
    if (!navigator.geolocation) {
      console.warn("Geolocation을 지원하지 않는 브라우저입니다. → IP 기반 사용");
      getIpLocation().then(setLocation);
      return;
    }

    const success = (position: GeolocationPosition) => {
      setLocation({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
    };

    const error = async () => {
      console.warn("GPS 위치 정보를 가져오지 못했습니다. → IP 기반 사용");
      const ipGeo = await getIpLocation();
      setLocation(ipGeo);
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
