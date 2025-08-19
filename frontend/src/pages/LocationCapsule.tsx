import { useEffect, useMemo, useState } from "react";
import Kakao from "../components/Domain/Map/Kakao";
import { getLtList } from "../api/MapApi";
import useLatLng from "../hooks/useLatLng";
import type { LtListDto } from "../types/map";

const LocationCapsule = () => {
  const [data, setData] = useState<LtListDto[]>([]);
  const addressList = useMemo(() => data.map((item) => item.capLtAddr), [data]);
  const latLng = useLatLng({ input: addressList });

  useEffect(() => {
    const res = async () => {
      try {
        const resData = await getLtList(1);
        setData(resData);
      } catch (e) {
        console.error(e);
      }
    };
    res();
  }, []);

  const enrichedData = useMemo(() => {
    if (!latLng || latLng.length === 0) return data;

    return data.map((item) => {
      const found = latLng.find((loc) => loc.addr === item.capLtAddr);
      return found ? { ...item, lat: found.lat, lng: found.lng } : item;
    });
  }, [data, latLng]);

  return (
    <>
      <Kakao customProps={enrichedData} />
    </>
  );
};

export default LocationCapsule;
