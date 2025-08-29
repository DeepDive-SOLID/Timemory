import { CustomOverlayMap, Map, MapMarker } from "react-kakao-maps-sdk";
import style from "../../../styles/CustomOverlay.module.scss";
import { setLat, setLng } from "../../../store/locationSlice";
import { getAddressForLatLng } from "./geocoder";
import type { KakaoProps } from "../../../types/map";
import { useAppDispatch, useAppSelector } from "../../../hooks/hooks";
import useMyLocation from "../../../hooks/useMyLocation";
import ImgBox from "./ImgBox";

const Kakao = ({ customProps }: KakaoProps) => {
  // 현재 내 위치를 가져옴 - 커스텀 훅
  const location = useMyLocation();

  // redux를 통한 상태관리
  const check = useAppSelector((state) => state.location.check);
  const lng = useAppSelector((state) => state.location.x);
  const lat = useAppSelector((state) => state.location.y);
  const type = useAppSelector((state) => state.searchType.searchType);
  const dispatch = useAppDispatch();

  // 맵 중심 (center를 구함)
  const center = !check ? { lat: location.lat, lng: location.lng } : { lat, lng };

  const clickEvent = (e: kakao.maps.event.MouseEvent) => {
    if (type === "pin") {
      dispatch(setLat(e.latLng.getLat()));
      dispatch(setLng(e.latLng.getLng()));
      getAddressForLatLng({ lat: e.latLng.getLat(), lng: e.latLng.getLng(), dispatch });
    }
  };
  return (
    <Map
      center={center}
      style={{
        width: "100%",
        height: "100vh",
      }}
      onClick={(_, mouseEvent) => clickEvent(mouseEvent)}
      level={customProps ? 10 : 3}
    >
      {!customProps && <MapMarker position={!check ? location : { lat, lng }} />}

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
              {/* 임시 url */}
              {/* 커스텀 오버레이 이미지 */}
              <ImgBox img={items.capImg} className={style.customOverlay} url='home' alt='커스텀 이미지' />
            </CustomOverlayMap>
          )
      )}
    </Map>
  );
};

export default Kakao;
