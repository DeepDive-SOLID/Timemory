import React from "react";
import styles from "../../styles/MyCapsule.module.scss";
import { map, map_pin } from "../../assets/index.ts";
import { useNavigate } from "react-router-dom";

const LocationSection: React.FC = () => {
  const navigate = useNavigate();

  const handleMapClick = () => {
    // 개인 캡슐 지도 페이지로 이동
    navigate("/myCapsuleMap");
  };

  return (
    <div className={styles.mapCtaSection}>
      <img src={map} alt="map" className={styles.mapBackground} />
      <button className={styles.mapCtaButton} onClick={handleMapClick}>
        <img src={map_pin} alt="map pin" />
        <span>확인하기</span>
      </button>
    </div>
  );
};

export default LocationSection;
