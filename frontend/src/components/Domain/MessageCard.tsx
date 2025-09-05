import React, { useState } from "react";
import styles from "../../styles/MyCapsule.module.scss";
import { lock, x_circle } from "../../assets/index.ts";
import type { MessageCard } from "../../types/capsule";
import DeleteConfirm from "../UI/DeleteConfirm";
import { deleteCapsuleApi } from "../../api/MyCapsuleApi";

interface MessageCardSectionProps {
  cards: MessageCard[];
  onCapsuleDeleted?: () => void;
}

const MessageCardSection: React.FC<MessageCardSectionProps> = ({
  cards,
  onCapsuleDeleted,
}) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedCardId, setSelectedCardId] = useState<number | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeleteClick = (cardId: number) => {
    setSelectedCardId(cardId);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    if (selectedCardId && !isDeleting) {
      try {
        setIsDeleting(true);
        await deleteCapsuleApi(selectedCardId);

        // 삭제 성공 시 부모 컴포넌트에 알림
        if (onCapsuleDeleted) {
          onCapsuleDeleted();
        }

        // 모달 닫기
        setShowDeleteModal(false);
        setSelectedCardId(null);

        // 삭제 성공 메시지
        alert("메시지가 성공적으로 삭제되었습니다.");
      } catch (error) {
        // 에러 메시지 표시
        const errorMessage =
          error instanceof Error
            ? error.message
            : "메시지 삭제 중 오류가 발생했습니다.";
        alert(errorMessage);
      } finally {
        setIsDeleting(false);
      }
    }
  };

  const handleDeleteCancel = () => {
    setShowDeleteModal(false);
    setSelectedCardId(null);
  };
  return (
    <div className={styles.messageCardsSection}>
      <div className={styles.messageCardsContainer}>
        {cards.map((card) => {
          const isLocked = !card.isOpened;

          return (
            <div
              key={card.id}
              className={`${styles.messageCard} ${
                isLocked ? styles.locked : ""
              }`}
            >
              {isLocked && (
                <button
                  className={styles.closeButton}
                  onClick={() => handleDeleteClick(card.id)}
                >
                  <img src={x_circle} alt="close" />
                </button>
              )}

              <div className={styles.messageContent}>
                <p className={styles.messageText}>{card.message}</p>

                {card.image && (
                  <div className={styles.messageImage}>
                    <img src={card.image} alt="message" />
                  </div>
                )}

                <div className={styles.hashtags}>
                  {card.hashtags.map((tag, idx) => (
                    <span key={idx} className={styles.hashtag}>
                      {tag}
                    </span>
                  ))}
                </div>

                <div className={styles.messageDivider}></div>
              </div>

              <div className={styles.messageFooter}>
                <button
                  className={styles.deleteButton}
                  onClick={() => handleDeleteClick(card.id)}
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2M10 11v6M14 11v6" />
                  </svg>
                </button>
                <div className={styles.messageInfo}>
                  <span className={styles.messageDate}>{card.createdDate}</span>
                  <span className={styles.messageAuthor}>{card.author}</span>
                </div>
              </div>

              {isLocked && (
                <div className={styles.lockOverlay}>
                  <div className={styles.lockIcon}>
                    <img src={lock} alt="lock" />
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <DeleteConfirm
        isOpen={showDeleteModal}
        onClose={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
        title="메시지를 삭제하시겠습니까?"
        isDeleting={isDeleting}
      />
    </div>
  );
};

export default MessageCardSection;
