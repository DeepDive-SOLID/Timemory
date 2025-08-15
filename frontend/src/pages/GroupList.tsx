import { useState } from "react";
import styles from "../styles/GroupList.module.scss";
import type { Group } from "../types/group";
import GroupTabs from "../components/Domain/GroupTab";
import GroupCard from "../components/Domain/GroupCard";
import GroupModal from "../components/UI/GroupCreate";
import { profile_img, profile_img2 } from "../assets";

const GroupListPage = () => {
  const [activeTab, setActiveTab] = useState<"my" | "open">("my");
  const [isGroupModalOpen, setIsGroupModalOpen] = useState(false);

  // 임시 데이터
  const myGroups: Group[] = [
    {
      id: 1,
      name: "SOLID 팀",
      memberCount: 5,
      members: ["김김김", "이이이", "박박박", "정정정", "최최최"],
      profiles: [
        profile_img,
        profile_img2,
        profile_img,
        profile_img2,
        profile_img,
      ],
    },
    {
      id: 2,
      name: "남칭구",
      memberCount: 2,
      members: ["홍홍홍", "김김김"],
      profiles: [profile_img2, profile_img],
    },
  ];

  const openGroups: Group[] = [
    {
      id: 3,
      name: "크리스마스",
      date: "12/25",
      members: ["김김김", "이이이", "박박박", "정정정", "최최최"],
      profiles: [
        profile_img,
        profile_img2,
        profile_img,
        profile_img2,
        profile_img,
      ],
    },
  ];

  const currentGroups = activeTab === "my" ? myGroups : openGroups;

  const handleCreateGroup = (groupName: string, members: string[]) => {
    console.log("새 그룹 생성:", { groupName, members });
    // TODO: 실제 그룹 생성 로직 구현
  };

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
      <div className={styles.groupList}>
        {currentGroups.map((group) => (
          <GroupCard
            key={group.id}
            group={group}
            isOpenGroup={activeTab === "open"}
          />
        ))}
      </div>

      {/* 그룹 생성 모달 */}
      <GroupModal
        isOpen={isGroupModalOpen}
        onClose={() => setIsGroupModalOpen(false)}
        onCreateGroup={handleCreateGroup}
      />
    </div>
  );
};

export default GroupListPage;
