import { useState } from "react";
import styles from "../../styles/GroupCard.module.scss";
import { rectangle_radius_0, dots_three } from "../../assets";
import GroupEdit from "../UI/GroupEdit";
import type { GroupCardProps } from "../../types/groupCard";
import {
  getValidProfileImageUrl,
  useImageErrorHandler,
} from "../../utils/imageUtils";
import { useNavigate } from "react-router-dom";
import { events } from "../../constants/events";

const GroupCard = ({ group, isOpenGroup = false }: GroupCardProps) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const { imageErrors, handleImageError } = useImageErrorHandler();

  const getSubtitle = () => {
    if (isOpenGroup && group.date) {
      return group.date;
    }
    if (group.memberCount !== undefined) {
      return `${group.memberCount}`;
    }
    return "";
  };

  const navigate = useNavigate();

  const handleCardClick = () => {
    if (isOpenGroup) {
      // 오픈 그룹이면 이벤트 id 찾기
      const event = events.find(
        (e) => e.annName === group.name || e.date === group.date
      );
      if (event) {
        navigate(`/openlist/${event.id}`, {
          state: { teamId: group.id },
        });
      }
    } else {
      // 마이 그룹이면 기존처럼 이동
      navigate(`/group/${group.id}`);
    }
  };

  const handleMenuClick = () => {
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
  };

  return (
    <>
      <div className={styles.groupCard} onClick={handleCardClick}>
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
            {group.members.map((member, index) => {
              const profileUrl =
                group.profiles && group.profiles[index]
                  ? getValidProfileImageUrl(group.profiles[index])
                  : null;

              return (
                <div key={index} className={styles.avatar}>
                  {profileUrl && !imageErrors[index] ? (
                    <img
                      src={profileUrl}
                      alt={member}
                      className={styles.profileImage}
                      onError={() => handleImageError(index)}
                    />
                  ) : (
                    <div className={styles.defaultAvatar}>
                      {member.charAt(0)}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <GroupEdit
        isOpen={isEditModalOpen}
        onClose={handleCloseEditModal}
        teamId={group.id}
      />
    </>
  );
};

export default GroupCard;
