import { setAddress, setBuildingName, setCheck, setLocation } from "../../../store/locationSlice";
import type { InputProps, LatLngProps } from "../../../types/map";

const geocoder = new kakao.maps.services.Geocoder();

// 입력값 ( x,y 좌표 및 도로명, 건물이름 )을 통해 데이터를 얻음
export const getAddressForInput = ({ inputData, dispatch }: InputProps) => {
  geocoder.addressSearch(inputData, function (result, status) {
    if (status === kakao.maps.services.Status.OK) {
      result.forEach((items) =>
        dispatch(
          setLocation({
            address_name: items.road_address?.address_name,
            building_name: items.road_address?.building_name,
            x: parseFloat(items.x),
            y: parseFloat(items.y),
          })
        )
      );
      dispatch(setCheck(true));
    }
  });
};

// 해당하는 x,y 좌표를 통해 주소값을 얻음
export const getAddressForLatLng = ({ lat, lng, dispatch }: LatLngProps) => {
  geocoder.coord2Address(lng, lat, function (result, status) {
    if (status === kakao.maps.services.Status.OK) {
      if (result === null) return;
      result.map((items) => (dispatch(setBuildingName(items.road_address?.building_name)), dispatch(setAddress(items.road_address?.address_name))));
    }
    dispatch(setCheck(true));
  });
};
