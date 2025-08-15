import { useState } from "react";
import styles from "../../styles/GroupCard.module.scss";
import type { Group } from "../../types/group";
import { rectangle_radius_0, dots_three } from "../../assets";
import GroupEdit from "../UI/GroupEdit";

interface GroupCardProps {
  group: Group;
  isOpenGroup?: boolean;
}

const GroupCard = ({ group, isOpenGroup = false }: GroupCardProps) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const getSubtitle = () => {
    if (isOpenGroup && group.date) {
      return group.date;
    }
    if (group.memberCount !== undefined) {
      return `${group.memberCount}`;
    }
    return "";
  };

  const handleMenuClick = () => {
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
  };

  const handleEditGroup = (groupName: string, members: string[]) => {
    // 그룹 수정 로직을 여기에 구현
    console.log("그룹 수정:", { groupName, members });
    setIsEditModalOpen(false);
  };

  return (
    <>
      <div className={styles.groupCard}>
        <div className={styles.cardBackground}>
          <img
            src={rectangle_radius_0}
            alt=""
            className={`${styles.borderImage} ${
              isOpenGroup ? styles.openGroupBorder : ""
            }`}
          />
        </div>
        <div className={styles.cardContent}>
          <div className={styles.groupHeader}>
            <h3 className={styles.groupName}>
              {group.name}
              {getSubtitle() && (
                <span
                  className={
                    isOpenGroup ? styles.dateText : styles.subtitleText
                  }
                >
                  ({getSubtitle()})
                </span>
              )}
            </h3>
            {!isOpenGroup && (
              <button className={styles.menuButton} onClick={handleMenuClick}>
                <img src={dots_three} alt="Menu" />
              </button>
            )}
          </div>
          <div className={styles.memberAvatars}>
            {group.members.map((member, index) => (
              <div key={index} className={styles.avatar}>
                {group.profiles && group.profiles[index] ? (
                  <img
                    src={group.profiles[index]}
                    alt={member}
                    className={styles.profileImage}
                  />
                ) : (
                  member
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <GroupEdit
        isOpen={isEditModalOpen}
        onClose={handleCloseEditModal}
        onCreateGroup={handleEditGroup}
      />
    </>
  );
};

export default GroupCard;
