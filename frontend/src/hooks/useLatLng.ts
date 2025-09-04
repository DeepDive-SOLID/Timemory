import { useEffect, useState, useMemo } from "react";
import type { UseLatLngProps, Location } from "../types/map";

const useLatLng = ({ input }: UseLatLngProps): Location[] => {
  const [latLngs, setLatLngs] = useState<Location[]>([]);

  // Geocoder는 재사용 가능하게 메모이제이션
  const geocoder = useMemo(() => new kakao.maps.services.Geocoder(), []);

  useEffect(() => {
    if (!input || input.length === 0) {
      setLatLngs([]);
      return;
    }

    const results: Location[] = [];

    input.forEach((address) => {
      geocoder.addressSearch(address, (result, status) => {
        if (status === kakao.maps.services.Status.OK) {
          const data = result[0];
          results.push({
            lat: parseFloat(data.y),
            lng: parseFloat(data.x),
            addr: address,
          });
        } else {
          console.warn(`주소 변환 실패: ${address}`);
        }

        // 모든 요청이 끝난 시점에 state 갱신
        if (results.length === input.length) {
          setLatLngs(results);
        }
      });
    });
  }, [input, geocoder]);

  return latLngs;
};

export default useLatLng;
