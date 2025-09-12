import { useEffect, useState, useContext } from "react";
import { profile_cloud, option } from "../assets";
import TabBar from "../components/APP/TabBar";
import styles from "../styles/Mypage.module.scss";
import { useNavigate } from "react-router-dom";
import { getMemberDto } from "../api/mypageApi";
import type { MypageDto } from "../types/mypage";
import { AuthContext } from "../contexts/AuthContext";
import {
  getValidProfileImageUrl,
  useImageErrorHandler,
} from "../utils/imageUtils";

// JWT 토큰에서 memberId 추출
function getMemberIdFromToken(): string | null {
  const t = localStorage.getItem("accessToken");
  if (!t) return null;
  try {
    const payloadStr = atob(
      t.split(".")[1].replace(/-/g, "+").replace(/_/g, "/")
    );
    const payload = JSON.parse(
      decodeURIComponent(
        Array.from(payloadStr)
          .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
          .join("")
      )
    );
    return payload?.memberId ?? payload?.sub ?? null;
  } catch {
    return null;
  }
}

const Mypage = () => {
  const navigate = useNavigate();

  const { userInfo } = useContext(AuthContext)!;
  const memberIdFromCtx = userInfo?.memberId ?? "";
  const memberId = memberIdFromCtx || getMemberIdFromToken() || "";

  const [data, setData] = useState<MypageDto | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [err, setErr] = useState<string>("");

  const { handleImageError } = useImageErrorHandler();

  useEffect(() => {
    let mounted = true;

    const fetchMember = async () => {
      if (!memberId) {
        setErr("로그인이 필요합니다.");
        setLoading(false);
        return;
      }
      try {
        const res = await getMemberDto(memberId);
        if (mounted) setData(res);
      } catch (e) {
        console.error(e);
        setErr("회원 정보를 불러오지 못했어요.");
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchMember();
    return () => {
      mounted = false;
    };
  }, [memberId]);

  const profileSrc =
    data?.memberImg && data.memberImg.trim().length > 0
      ? getValidProfileImageUrl(data.memberImg) ?? profile_cloud
      : profile_cloud;

  if (loading) {
    return (
      <div className={styles.pageSkeleton}>
        <p className={styles.header}>MY PAGE</p>
        <div className={styles.profile}>
          <div className={styles.skeletonAvatar} />
          <div className={styles.nicknameWrapper}>
            <div className={styles.skeletonTextSm} />
          </div>
          <div className={styles.skeletonIcon} />
        </div>
        <div className={styles.infoContents}>
          {[...Array(4)].map((_, i) => (
            <div className={styles.info} key={i}>
              <div className={styles.skeletonTextXs} />
              <div className={styles.skeletonTextMd} />
            </div>
          ))}
        </div>
        <TabBar />
      </div>
    );
  }

  if (err) {
    return (
      <div className={styles.container}>
        <p className={styles.header}>MY PAGE</p>
        <div className={styles.errorBox}>{err}</div>
        <TabBar />
      </div>
    );
  }

  return (
    <div>
      <div className={styles.container}>
        <div className={styles.mainContent}>
          <p className={styles.header}>MY PAGE</p>

          <div className={styles.profile}>
            <img
              src={profileSrc}
              alt="profile"
              className={styles.profileImg}
              onError={() => handleImageError(0)}
            />

            <div className={styles.nicknameWrapper}>
              <p className={styles.nickname}>{data?.memberNickname ?? "-"}</p>
            </div>

            <img
              src={option}
              alt="option"
              className={styles.option}
              onClick={() =>
                navigate("/editinfo", { state: { initial: data } })
              }
              title="정보 수정"
            />
          </div>

          <div className={styles.infoContents}>
            <div className={styles.info}>
              <div className={styles.title}>NAME</div>
              <div className={styles.content}>{data?.memberName ?? "-"}</div>
            </div>
            <div className={styles.info}>
              <div className={styles.title}>EMAIL</div>
              <div className={styles.content}>{data?.memberEmail ?? "-"}</div>
            </div>
            <div className={styles.info}>
              <div className={styles.title}>PHONE</div>
              <div className={styles.content}>{data?.memberPhone ?? "-"}</div>
            </div>
            <div className={styles.info}>
              <div className={styles.title}>BIRTH</div>
              <div className={styles.content}>{data?.memberBirth ?? "-"}</div>
            </div>
          </div>
        </div>
      </div>
      <TabBar />
    </div>
  );
};

export default Mypage;
