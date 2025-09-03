import { useEffect, useMemo, useState } from "react";
import type { LtListDto } from "../types/map";
import useLatLng from "./useLatLng";
import { getLtListApi } from "../api/MapApi";

interface useCapsuleDataProps {
  groupId: string | undefined;
}
// 주소값에 대한 latlng 정보를 가져오는 커스텀 훅
const useCapsuleData = ({ groupId }: useCapsuleDataProps): LtListDto[] => {
  const [data, setData] = useState<LtListDto[]>([]);
  // api 요청 후 주소값을 따로 저장
  const addressList = useMemo(() => data.map((item) => item.capLtAddr), [data]);
  // 해당 주소값을 통해 주소의 lat,lng을 구하는 커스텀 훅
  const latLng = useLatLng({ input: addressList });

  useEffect(() => {
    const res = async () => {
      try {
        if (!groupId) return;
        // 소속팀에 해당하는 지도 데이터 요청
        const resData = await getLtListApi(Number(groupId));
        setData(resData);
      } catch (e) {
        console.error(e);
      }
    };
    res();
  }, [groupId]);

  // 해당하는 data 내부에 주소값에 latlng 값을 추가
  const filterData = useMemo(() => {
    if (!latLng || latLng.length === 0) return data;

    return data.map((item) => {
      const found = latLng.find((loc) => loc.addr === item.capLtAddr);
      return found ? { ...item, lat: found.lat, lng: found.lng } : item;
    });
  }, [data, latLng]);

  return filterData;
};

export default useCapsuleData;
