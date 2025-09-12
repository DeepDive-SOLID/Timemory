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
  // 현재 내 위치와 캡슐의 거리를 구하는 스테이트
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

  useEffect(() => {
    if (!customProps || customProps.length === 0 || !location.lat) {
      return;
    }

    const checkAndCallApi = () => {
      customProps.forEach(async (item) => {
        if (item.memberId !== userInfo?.memberId) return;
        if (item.capOpen) return;
        if (item.lat && item.lng) {
          setDistance(
            getDistance({
              lat1: location.lat,
              lon1: location.lng,
              lat2: item.lat,
              lon2: item.lng,
            })
          );

          // 100미터 이내이고 아직 API를 호출하지 않은 경우
          if (distance <= 100 && !calledApiIds.includes(item.capId)) {
            try {
              if (data) return () => clearInterval(intervalId);
              // 거리가 같아지면 api 요청을 하여 open 을 TRUE 로 만듬
              const res = await getCapsuleLtListApi(item.capId);
              setData(res[0]);
              setOpenModal((prev) => !prev);
            } catch (e) {
              console.error(e);
            }

            // API 호출 후 다시 호출되지 않도록 ID를 상태에 추가
            setCalledApiIds((prevIds) => [...prevIds, item.capId]);
          }
        }
      });
    };

    // 위치가 업데이트될 때마다 검사 실행
    const intervalId = setInterval(checkAndCallApi, 5000); // 5초마다 위치 확인

    // 컴포넌트 언마운트 시 인터벌 정리
    return () => clearInterval(intervalId);
  }, [location, customProps, calledApiIds]);

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
