import { Timemory_logo, cloud_img, kakao_logo } from "../assets";
import styles from "../styles/Login.module.scss";
import { useContext, useEffect } from "react";
import { AuthContext } from "../contexts/AuthContext.ts";
import { useNavigate } from "react-router-dom";
import { loginApi, loginKakaoApi } from "../api/loginApi.ts";
import { setToken } from "../utils/auth.ts";

const Login = () => {
  const REST_API_KEY = import.meta.env.VITE_KAKAO_REST_API_KEY;
  const REDIRECT_URI = "http://localhost:5173/login/kakao/callback";
  const { login } = useContext(AuthContext)!;
  const navigate = useNavigate();

  useEffect(() => {
    const code = new URL(window.location.href).searchParams.get("code");
    const pathname = window.location.pathname;

    if (pathname === "/login/kakao/callback" && code) {
      (async () => {
        try {
          const res = await loginKakaoApi(code);
          if (res.memberNickname) {
            loginEvent(res.memberId);
          } else {
            navigate("/nickname", { state: { id: res.memberId } });
          }
        } catch {
          alert("카카오 로그인중 오류가 발생했습니다.");
          navigate("/");
        }
      })();
    }
  }, [navigate]);

  const loginEvent = async (memberId: string) => {
    try {
      const token = await loginApi(memberId);
      setToken(token);
      login();
      navigate("/home");
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  };

  const handleLogin = () => {
    const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=talk_message&prompt=login&force_signup=true`;
    window.location.href = KAKAO_AUTH_URL;
  };

  if (window.location.pathname === "/login/kakao/callback") return null;

  return (
    <div className={styles.loginContainer}>
      <div className={styles.safeArea} />
      <div className={styles.mainContent}>
        <img className={styles.logo} src={Timemory_logo} alt='Timemory Logo' />
        <img className={styles.cloud} src={cloud_img} alt='Cloud' />
        <h1>
          <span className={styles.brand}>Timemory</span> 에
        </h1>
        <h1>오신걸 환영합니다</h1>
        <p className={styles.subtitle}>우리 함께 추억을 쌓아봐요</p>
      </div>

      <div className={styles.bottomArea}>
        <button type='button' onClick={handleLogin} className={styles.kakaoButton}>
          <img src={kakao_logo} /> 카카오 로그인
        </button>
      </div>
    </div>
  );
};

export default Login;
