import TabBar from "../components/APP/TabBar";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getOpenList } from "../api/openlistApi";
import type { OpenListDto } from "../types/openlist";
import { events } from "../constants/events";

const Home = () => {
  const [groups, setGroups] = useState<OpenListDto[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const list = await getOpenList();
        setGroups(list);
      } catch (e) {
        setErr("그룹 목록을 불러오지 못했습니다.");
        console.error(e);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const resolveEventId = (annName: string, annDt: string | number): string => {
    const byName = events.find((e) => e.annName === annName);
    if (byName) return byName.id;

    const byDate = events.find((e) => e.annDt === annDt);
    if (byDate) return byDate.id;

    console.warn("이벤트 매핑 실패:", { annName, annDt });
    return events[0].id;
  };

  return (
    <div>
      <h2 style={{ marginBottom: 12 }}>오픈 그룹</h2>
      {loading && <p>로딩 중…</p>}
      {err && <p style={{ color: "crimson" }}>{err}</p>}

      <ul style={{ listStyle: "none", padding: 0 }}>
        {groups.map((g) => {
          return (
            <li key={g.teamId} style={{ marginBottom: 12 }}>
              <Link
                to={`/openlist/${resolveEventId(g.annName, g.annDt)}`}
                state={{ teamId: g.teamId }}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <div
                  style={{
                    border: "1px solid #eee",
                    borderRadius: 12,
                    padding: 12,
                  }}
                >
                  <div style={{ fontWeight: 600 }}>{g.annName}</div>
                  <div style={{ fontSize: 12, color: "#666" }}>
                    teamId: {g.teamId} · annDt: {g.annDt}
                  </div>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
      <TabBar />
    </div>
  );
};

export default Home;
