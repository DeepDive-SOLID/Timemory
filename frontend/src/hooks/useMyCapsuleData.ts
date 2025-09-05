import { useEffect, useMemo, useState } from "react";
import type { LtListDto } from "../types/map";
import type { useMyCapsuleDataProps } from "../types/capsule";
import useLatLng from "./useLatLng";
import {
  getUserCapsulesApi,
  filterLocationCapsules,
} from "../api/MyCapsuleApi";

// getUserCapsulesApi를 호출하고 LOCATION 타입만 필터링하는 커스텀 훅
const useMyCapsuleData = ({
  groupId,
  customParam,
}: useMyCapsuleDataProps): LtListDto[] => {
  const [data, setData] = useState<LtListDto[]>([]);

  // api 요청 후 주소값을 따로 저장
  const addressList = useMemo(() => data.map((item) => item.capLtAddr), [data]);

  // 해당 주소값을 통해 주소의 lat,lng을 구하는 커스텀 훅
  const latLng = useLatLng({ input: addressList });

  useEffect(() => {
    const fetchMyCapsuleData = async () => {
      try {
        // getUserCapsulesApi 호출
        const response = await getUserCapsulesApi();

        // LOCATION 타입 캡슐만 필터링
        const locationCapsules = filterLocationCapsules(response.capsules);

        // Capsule 타입을 LtListDto 타입으로 변환 (지도에서 사용하는 필드만)
        const convertedData: LtListDto[] = locationCapsules.map((capsule) => ({
          capId: capsule.capsuleId, // 마커 식별용
          capLtAddr: capsule.locationAddress || "", // 주소 → 좌표 변환용
          capLtDetail: capsule.locationDetail || "", // 상세주소
          capImg: capsule.imageUrl || "", // 마커 이미지
          capOpen: capsule.isOpened.toString(), // 열림 여부 (마커 표시용)
          // 지도에서 사용하지 않는 필드들은 기본값으로 설정
          teamId: capsule.teamId,
          memberId: "",
          capText: capsule.content,
          capUt: capsule.createdAt,
          capEt: capsule.openDate,
          capTag: capsule.tag,
          capLtId: capsule.capsuleId.toString(),
        }));

        setData(convertedData);
      } catch (e) {
        console.error("마이 캡슐 데이터 조회 실패:", e);
        // 에러 발생시 빈 배열 반환
        setData([]);
      }
    };

    fetchMyCapsuleData();
  }, [groupId, customParam]);

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

export default useMyCapsuleData;
