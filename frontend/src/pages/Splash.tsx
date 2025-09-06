import { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { spalsh_up, spalsh_down, Timemory_logo } from "../assets";

const SplashScreen = () => {
  const controlsTop = useAnimation();
  const controlsBottom = useAnimation();
  const controlsLogo = useAnimation();

  useEffect(() => {
    const animate = async () => {
      // 1. 위/아래 반쪽 열기
      await Promise.all([
        controlsTop.start({ y: -70, transition: { duration: 0.5 } }),
        controlsBottom.start({ y: 70, transition: { duration: 0.5 } }),
      ]);

      // 2. 로고 나타나기
      await controlsLogo.start({ opacity: 1, transition: { duration: 0.5 } });

      // 3. 다시 닫기
      await Promise.all([
        controlsTop.start({ y: 20, transition: { duration: 0.5 } }),
        controlsBottom.start({ y: -20, transition: { duration: 0.5 } }),
      ]);

      // 4. 페이지 이동
      setTimeout(() => {
        window.location.href = "/login";
      }, 200);
    };

    animate();
  });

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      {/* 위쪽 반쪽 */}
      <motion.img
        src={spalsh_up}
        alt="splash-up"
        width={150}
        animate={controlsTop}
        initial={{ y: 0 }}
      />

      {/* 로고 */}
      <motion.img
        src={Timemory_logo}
        alt="timemory-logo"
        width={200}
        style={{ margin: "16px 0" }}
        animate={controlsLogo}
        initial={{ opacity: 0 }}
      />

      {/* 아래쪽 반쪽 */}
      <motion.img
        src={spalsh_down}
        alt="splash-down"
        width={150}
        animate={controlsBottom}
        initial={{ y: 0 }}
      />
    </div>
  );
};

export default SplashScreen;
