import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { splash_up, splash_down, Timemory_logo } from "../assets";
import styles from "../styles/Splash.module.scss";

const Splash = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/login");
    }, 2500);
    return () => clearTimeout(timer);
  });

  return (
    <div className={styles.container}>
      {/* 위쪽 반쪽 */}
      <img src={splash_up} alt="splash-up" className={styles.top} />

      {/* 로고 */}
      <img src={Timemory_logo} alt="timemory-logo" className={styles.logo} />

      {/* 아래쪽 반쪽 */}
      <img src={splash_down} alt="splash-down" className={styles.bottom} />
    </div>
  );
};

export default Splash;
