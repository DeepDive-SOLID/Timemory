import React from "react";
import styles from "../../styles/MyCapsule.module.scss";
import { map, map_pin } from "../../assets/index.ts";

const LocationSection: React.FC = () => {
  return (
    <div className={styles.mapCtaSection}>
      <img src={map} alt="map" className={styles.mapBackground} />
      <button className={styles.mapCtaButton}>
        <img src={map_pin} alt="map pin" />
        <span>확인하기</span>
      </button>
    </div>
  );
};

export default LocationSection;
