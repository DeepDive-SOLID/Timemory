import { useState, useEffect } from "react";
import styles from "../styles/GroupList.module.scss";
import type { Group, TeamResponseDto } from "../types/group";
import GroupTabs from "../components/Domain/GroupTab";
import GroupCard from "../components/Domain/GroupCard";
import GroupModal from "../components/UI/GroupCreate";
import TabBar from "../components/APP/TabBar";
import { cloud_img, profile_img } from "../assets";
import { getUserTeams } from "../api/groupApi";
import { getOpenList } from "../api/openlistApi";
import type { OpenListDto } from "../types/openlist";
import { events } from "../constants/events";

const GroupListPage = () => {
  const [activeTab, setActiveTab] = useState<"my" | "all">("my");
  const [isGroupModalOpen, setIsGroupModalOpen] = useState(false);
  const [userTeams, setUserTeams] = useState<TeamResponseDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [openGroups, setOpenGroups] = useState<OpenListDto[]>([]);

  // 컴포넌트 마운트 시 사용자의 그룹 목록과 전체 그룹 목록 조회
  useEffect(() => {
    const fetchTeams = async () => {
      try {
        setLoading(true);
        setError(null);

        // 사용자의 그룹 목록 조회 (JWT 토큰 기반)
        try {
          const userData = await getUserTeams();
          setUserTeams(userData);
        } catch (userTeamsError) {
          console.error("사용자 그룹 목록 조회 실패:", userTeamsError);
          // 사용자 그룹 목록 조회 실패는 전체 목록 표시에 영향을 주지 않음
          setUserTeams([]);
        }

        // 전체 그룹(open list) 조회
        try {
          const openData = await getOpenList();
          setOpenGroups(openData);
        } catch (openErr) {
          console.error("전체 그룹 목록 조회 실패:", openErr);
          setOpenGroups([]);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchTeams();
  }, []);

  // API 데이터를 Group 형식으로 변환
  const myGroups: Group[] = userTeams.map((team) => ({
    id: team.teamId,
    name: team.teamName,
    memberCount: team.memberCount,
    members: team.members.map((member) => member.nickname),
    profiles: team.members.map((member) => member.profileImg),
  }));

  const uniqueOpenGroups = Array.from(
    new Map(openGroups.map((g) => [g.teamId, g])).values()
  );

  const allGroups: Group[] = events.map((event) => {
    const match = uniqueOpenGroups.find(
      (g) => g.annName === event.annName || String(g.annDt) === event.annDt
    );

    return {
      id: match ? match.teamId : -1,
      name: event.annName,
      date: event.date,
      members: [],
      profiles: match ? match.memberProfiles.map((p) => p ?? profile_img) : [],
    };
  });

  const currentGroups = activeTab === "my" ? myGroups : allGroups;

  // 로딩 중일 때
  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.statusBar}></div>
        <div className={styles.loadingContainer}>
          <p>그룹 목록을 불러오는 중...</p>
        </div>
      </div>
    );
  }

  // 에러가 있을 때
  if (error) {
    return (
      <div className={styles.container}>
        <div className={styles.statusBar}></div>
        <div className={styles.errorContainer}>
          <p>{error}</p>
          <button onClick={() => window.location.reload()}>다시 시도</button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {/* 상태바 영역 - 간격만 제공 */}
      <div className={styles.statusBar}></div>

      {/* 탭 영역 */}
      <GroupTabs
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onAddGroup={() => setIsGroupModalOpen(true)}
      />

      {/* 그룹 목록 */}
      {currentGroups.length === 0 ? (
        <div className={styles.emptyContainer}>
          <img src={cloud_img} alt="빈 상태" width={160} height={160} />
          <div className={styles.title}>
            {activeTab === "my"
              ? "아직 소속된 그룹이 없어요"
              : "등록된 그룹이 없어요"}
          </div>
          <div className={styles.description}>
            {activeTab === "my"
              ? "새로운 그룹을 만들어 친구들과 추억을 기록해 보세요"
              : "새로운 그룹이 등록되면 여기에 표시됩니다"}
          </div>
          {activeTab === "my" && (
            <button
              className={`${styles.ctaButton} ${styles.isPrimaryBlue}`}
              onClick={() => setIsGroupModalOpen(true)}
            >
              그룹 만들기
            </button>
          )}
        </div>
      ) : (
        <div className={styles.groupList}>
          {currentGroups.map((group) => (
            <GroupCard
              key={`${group.id}-${group.name}`}
              group={group}
              isOpenGroup={activeTab === "all"}
            />
          ))}
        </div>
      )}

      {/* 그룹 생성 모달 */}
      <GroupModal
        isOpen={isGroupModalOpen}
        onClose={() => setIsGroupModalOpen(false)}
      />

      {/* TabBar */}
      <TabBar />
    </div>
  );
};

export default GroupListPage;
