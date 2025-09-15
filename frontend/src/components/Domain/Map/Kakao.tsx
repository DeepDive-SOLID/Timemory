import { CustomOverlayMap, Map, MapMarker } from "react-kakao-maps-sdk";
import style from "../../../styles/CustomOverlay.module.scss";
import { setLat, setLng } from "../../../store/locationSlice";
import { getAddressForLatLng } from "./geocoder";
import type { KakaoProps } from "../../../types/map";
import { useAppDispatch, useAppSelector } from "../../../hooks/hooks";
import useMyLocation from "../../../hooks/useMyLocation";
import ImgBox from "./ImgBox";
import { map_pin_blue, lock, mini_logo } from "../../../assets/index";
import { useContext, useEffect, useState } from "react";
import { getDistance } from "./getDistance";
import { getCapsuleLtListApi } from "../../../api/open";
import CapsuleAnimation from "../Home/CapsuleAnimation";
import type { CapsuleLtOpenDto } from "../../../types/openCapsule";
import OpenEvent from "./OpenEvent";
import { AuthContext } from "../../../contexts/AuthContext";

const Kakao = ({ customProps, showDeleteButton = false }: KakaoProps) => {
  // 현재 내 위치를 가져옴 - 커스텀 훅
  const location = useMyLocation(true);
  const { userInfo } = useContext(AuthContext)!;
  // redux를 통한 상태관리
  const check = useAppSelector((state) => state.location.check);
  const lng = useAppSelector((state) => state.location.x);
  const lat = useAppSelector((state) => state.location.y);
  const type = useAppSelector((state) => state.searchType.searchType);
  const dispatch = useAppDispatch();
  const [data, setData] = useState<CapsuleLtOpenDto | null>(null);
  const [animation, setAnimation] = useState<boolean>(false);
  const [openModal, setOpenModal] = useState<boolean>(false);
  // 모달에 사용할 distance 스테이트
  const [distance, setDistance] = useState<number>(0);
  // 맵 중심 (center를 구함)
  const center = !check ? { lat: location.lat, lng: location.lng } : { lat, lng };

  const clickEvent = (e: kakao.maps.event.MouseEvent) => {
    if (type === "pin") {
      dispatch(setLat(e.latLng.getLat()));
      dispatch(setLng(e.latLng.getLng()));
      getAddressForLatLng({
        lat: e.latLng.getLat(),
        lng: e.latLng.getLng(),
        dispatch,
      });
    }
  };
  const [calledApiIds, setCalledApiIds] = useState<number[]>([]);
  // 모든 캡슐의 거리를 저장하는 스테이트
  const [distances, setDistances] = useState<Record<number, number>>({});

  // 해당하는 캡슐의 거리를 찾는 effect 훅
  useEffect(() => {
    if (!customProps || customProps.length === 0 || !location.lat) return;

    const checkDistances = () => {
      const newDistances: Record<number, number> = {};

      customProps.forEach((item) => {
        if (item.lat && item.lng) {
          const d = getDistance({
            lat1: location.lat,
            lon1: location.lng,
            lat2: item.lat,
            lon2: item.lng,
          });
          newDistances[item.capId] = d;
        }
      });

      setDistances(newDistances);
    };

    const intervalId = setInterval(checkDistances, 3000);
    return () => clearInterval(intervalId);
  }, [location, customProps]);

  // distance가 업데이트될 때 API 호출
  useEffect(() => {
    if (!customProps) return;
    if (openModal) return;

    // 100m 안의 캡슐만 필터링
    const nearbyCapsules = customProps.filter((item) => {
      if (item.memberId !== userInfo?.memberId) return false;
      if (item.capOpen) return false;

      const d = distances[item.capId];
      return d !== undefined && d <= 100 && !calledApiIds.includes(item.capId);
    });

    if (nearbyCapsules.length === 0) return;

    // 거리순 정렬 후 가장 가까운 것만 선택
    const nearest = nearbyCapsules.sort((a, b) => distances[a.capId] - distances[b.capId])[0];

    (async () => {
      try {
        const res = await getCapsuleLtListApi(nearest.capId);
        setData(res[0]);
        setOpenModal(true);
        setDistance(distances[nearest.capId]);
        setCalledApiIds((prev) => [...prev, nearest.capId]);
        return;
      } catch (e) {
        console.error(e);
      }
    })();
  }, [distances, customProps, calledApiIds, userInfo]);

  return (
    <>
      {openModal && <OpenEvent setAnimation={setAnimation} setOpenModal={setOpenModal} distance={distance} />}
      {animation && data && <CapsuleAnimation data={data} />}
      <Map
        center={center}
        style={{
          width: "100%",
          height: "100vh",
        }}
        onClick={(_, mouseEvent) => clickEvent(mouseEvent)}
        level={customProps ? 10 : 3}
      >
        <MapMarker
          position={!check ? location : { lat, lng }}
          zIndex={2}
          image={{
            src: map_pin_blue,
            size: { width: 50, height: 40 },
          }}
        />

        {customProps?.map(
          (items) =>
            items.lat !== undefined &&
            items.lng !== undefined && (
              <CustomOverlayMap
                key={items.capId}
                position={{
                  lat: items.lat,
                  lng: items.lng,
                }}
                yAnchor={1}
              >
                {/* 커스텀 오버레이 이미지 */}
                {items.capOpen ? (
                  <ImgBox img={items.capImg ? items.capImg : mini_logo} className={style.customOverlay} url='detail' alt='커스텀 이미지' capId={items.capId} showDeleteButton={showDeleteButton} />
                ) : (
                  <ImgBox img={lock} className={style.customOverlay} alt='오픈전 사진' capId={items.capId} showDeleteButton={showDeleteButton} />
                )}
              </CustomOverlayMap>
            )
        )}
      </Map>
    </>
  );
};

export default Kakao;
