import { setAddress, setBuildingName, setCheck, setLocation } from "../../../store/locationSlice";
import type { InputProps, LatLngProps } from "../../../types/map";

const geocoder = new kakao.maps.services.Geocoder();

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

export const getAddressForLatLng = ({ lat, lng, dispatch }: LatLngProps) => {
  geocoder.coord2Address(lng, lat, function (result, status) {
    if (status === kakao.maps.services.Status.OK) {
      if (result === null) return;
      result.map((items) => (dispatch(setBuildingName(items.road_address?.building_name)), dispatch(setAddress(items.road_address?.address_name))));
    }
  });
};
