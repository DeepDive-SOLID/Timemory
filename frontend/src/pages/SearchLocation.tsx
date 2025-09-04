import MapSearch from "../components/Domain/Map/MapSearch";
import Kakao from "../components/Domain/Map/Kakao";
import SearchInfo from "../components/Domain/Map/SearchInfo";
import SelectType from "../components/Domain/Map/SelectType";

const SearchLocation = () => {
  return (
    <div style={{ position: "relative" }}>
      <MapSearch />
      <SelectType />
      <Kakao />
      <SearchInfo />
    </div>
  );
};

export default SearchLocation;
