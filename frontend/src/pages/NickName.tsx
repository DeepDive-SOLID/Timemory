import { Timemory_logo, cloud_img } from "../assets";
import styles from "../styles/NickName.module.scss";
import StartButton from "../components/UI/StartButton.tsx";
import { useLocation, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { checkNicknameApi, loginApi } from "../api/loginApi.ts";
import { AuthContext } from "../contexts/AuthContext";
import { setToken } from "../utils/auth.ts";
import type { CheckNicknameDto } from "../types/login.ts";

const NickName = () => {
    const location = useLocation();
    const id = location.state?.id;
    const navigate = useNavigate();
    const [nickname, setNickname] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const { login } = useContext(AuthContext)!;

    const handleStartClick = async () => {
        // 닉네임이 비어있는지 확인
        if (!nickname.trim()) {
            setErrorMessage("닉네임을 입력해주세요!");
            return;
        }

        setErrorMessage("");

        // 닉네임 중복 확인
        try {
            // API로 닉네임 중복 확인
            const isDuplicate = await checkNicknameApi({
                memberId: id,
                memberNickname: nickname,
            } as CheckNicknameDto);
            if (isDuplicate) {
                setErrorMessage("이미 존재하는 닉네임이에요!");
                return;
            }

            // 모든 검증 통과 시 로그인 요청
            await loginEvent();
        } catch {
            alert("로그인중 오류가 발생했습니다.");
        }
    };

    // 로그인 성공 시 토큰 저장 후 홈화면으로 이동
    const loginEvent = async () => {
        try {
            const token = await loginApi(id);
            setToken(token);
            login();
            navigate("/home");
        } catch (error) {
            console.error('Login error:', error);
            throw error;
        }
    };

    const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNickname(e.target.value);
        // 입력할 때 에러 메시지 초기화
        if (errorMessage) {
            setErrorMessage("");
        }
    };

    return (
        <div className={styles.nickNameContainer}>
            <div className={styles.safeArea} />
            <div className={styles.mainContent}>
                <img className={styles.logo} src={Timemory_logo} alt="Timemory Logo"/>
                <p className={styles.subContent}>닉네임을 설정해주세요.</p>
                <img className={styles.cloud} src={cloud_img} alt="Cloud"/>
                <div className={styles.inputArea}>
                    <div className={styles.inputWrapper}>
                        <input
                            className={styles.inputBox}
                            type="text"
                            value={nickname}
                            onChange={handleNicknameChange}
                        />
                    </div>
                </div>
                <p className={styles.errorContent}>
                    {errorMessage || ""}
                </p>
            </div>

            <div className={styles.bottomArea}>
                <StartButton
                    onClick={() => handleStartClick()}
                    className={styles.startButton}
                />
            </div>
        </div>
    );
};

export default NickName;
