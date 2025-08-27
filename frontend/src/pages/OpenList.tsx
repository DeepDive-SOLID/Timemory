import StatusBar from "../components/APP/StatusBar";
import type { CardItem } from "../components/UI/CardList";
import CardList from "../components/UI/CardList";
import styles from "../styles/OpenList.module.scss";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { events } from "../constants/events";
import { useEffect, useMemo, useState } from "react";
import { getOpenCapsuleList } from "../api/openlistApi";
import type { OpenCapsuleListDto } from "../types/openlist";

const OpenList = () => {
  const { eventId } = useParams<{ eventId: string }>();
  const eventData = events.find((e) => e.id === eventId) || events[0];
  const navigate = useNavigate();

  const location = useLocation() as { state?: { teamId?: number } };
  const teamId = location.state?.teamId;

  const [capsules, setCapsules] = useState<OpenCapsuleListDto[]>([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    const run = async () => {
      if (typeof teamId !== "number") {
        setErr("팀 정보가 없습니다. 홈에서 다시 진입해주세요.");
        return;
      }
      try {
        setLoading(true);
        const list = await getOpenCapsuleList(teamId);
        setCapsules(list);
      } catch (e) {
        setErr("캡슐 목록을 불러오지 못했습니다.");
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    run();
  }, [teamId]);

  const fmt = (s: string) => {
    const d = new Date(s);
    if (Number.isNaN(d.getTime())) return s;
    const yyyy = d.getFullYear();
    const mm = `${d.getMonth() + 1}`.padStart(2, "0");
    const dd = `${d.getDate()}`.padStart(2, "0");
    return `${yyyy}.${mm}.${dd}`;
  };

  const cardItems: CardItem[] = useMemo(
    () =>
      capsules.map((c, idx) => ({
        title: c.capText,
        date: fmt(c.capUt),
        user: c.memberNickname,
        isOpen: true, // 서버에서 상태가 오면 매핑
        //캡슐 상세로 이동
        onClick: () => navigate(`/capsule/${idx}`, { state: { teamId } }),
      })),
    [capsules, navigate, teamId]
  );

  const goToQuizOpen = () => {
    navigate(`/quiz/${eventId}`, { state: { teamId } });
  };

  return (
    <div>
      <StatusBar to={"/home"} />

      <div className={styles.stickySection}>
        <div className={styles.title}>{eventData.title}</div>
        <p className={styles.date}>{eventData.date}</p>
        <p className={styles.message}>{eventData.message}</p>
      </div>

      <div className={styles.contents}>
        <img src={eventData.image} alt="event" className={styles.listimg} />
        <div className={styles.button} onClick={goToQuizOpen}>
          {eventData.buttonText}
        </div>
      </div>

      <div>
        {loading && <p>불러오는 중…</p>}
        {err && <p style={{ color: "crimson" }}>{err}</p>}
        {!loading && !err && <CardList items={cardItems} />}
      </div>
    </div>
  );
};

export default OpenList;
