import { useState } from "react";
import styles from "../../styles/GroupCard.module.scss";
import { rectangle_radius_0, dots_three } from "../../assets";
import GroupEdit from "../UI/GroupEdit";
import type { GroupCardProps } from "../../types/groupCard";

const GroupCard = ({ group, isOpenGroup = false }: GroupCardProps) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [imageErrors, setImageErrors] = useState<{ [key: number]: boolean }>(
    {}
  );

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

  const handleImageError = (index: number) => {
    setImageErrors((prev) => ({ ...prev, [index]: true }));
  };

  // 프로필 이미지 URL 검증 및 수정
  const getValidProfileImageUrl = (url: string): string | null => {
    if (!url) return null;

    // 잘못된 URL 패턴 감지 (localhost:8080/solidhttp://...)
    if (url.includes("localhost:8080/solidhttp://")) {
      // 카카오 프로필 이미지 URL 추출
      const kakaoUrlMatch = url.match(/solidhttp:\/\/(.+)/);
      if (kakaoUrlMatch) {
        return `http://${kakaoUrlMatch[1]}`;
      }
    }

    return null;
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
