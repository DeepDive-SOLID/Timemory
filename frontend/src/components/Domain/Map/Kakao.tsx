import { CustomOverlayMap, Map, MapMarker } from "react-kakao-maps-sdk";
import useLocation from "../../../hooks/useLocation";
import CustomOverlay from "./CustomOverlay";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../../store";
import { setCheck, setLat, setLng } from "../../../store/locationSlice";
import { getAddressForLatLng } from "./geocoder";
import type { KakaoProps } from "../../../types/map";

const Kakao = ({ customProps }: KakaoProps) => {
  // 현재 내 위치를 가져옴
  const location = useLocation();
  const check = useSelector((state: RootState) => state.location.check);
  const lng = useSelector((state: RootState) => state.location.x);
  const lat = useSelector((state: RootState) => state.location.y);
  const type = useSelector((state: RootState) => state.searchType.searchType);
  const dispatch = useDispatch();

  const clickEvent = (e: kakao.maps.event.MouseEvent) => {
    if (type === "pin") {
      dispatch(setLat(e.latLng.getLng()));
      dispatch(setLng(e.latLng.getLat()));
      dispatch(setCheck(true));
      getAddressForLatLng({ lat, lng, dispatch });
    }
  };
  return (
    <>
      <Map
        center={{
          lat: !check ? location.lat : lat,
          lng: !check ? location.lng : lng,
        }}
        style={{
          width: "100%",
          height: "100vh",
        }}
        onClick={(_, mouseEvent) => clickEvent(mouseEvent)}
        level={customProps ? 10 : 3}
      >
        {customProps ? (
          ""
        ) : (
          <MapMarker
            position={{
              lat: !check ? location.lat : lat,
              lng: !check ? location.lng : lng,
            }}
          />
        )}

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
                <CustomOverlay img={items.capImg} />
              </CustomOverlayMap>
            )
        )}
      </Map>
    </>
  );
};

export default Kakao;
