import React, { useState } from "react";
import styles from "../../styles/MyCapsule.module.scss";
import { lock, x_circle } from "../../assets/index.ts";
import type { MessageCard } from "../../types/capsule";
import DeleteConfirm from "../UI/DeleteConfirm";

interface MessageCardSectionProps {
  cards: MessageCard[];
}

const MessageCardSection: React.FC<MessageCardSectionProps> = ({ cards }) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedCardId, setSelectedCardId] = useState<number | null>(null);

  const handleDeleteClick = (cardId: number) => {
    setSelectedCardId(cardId);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = () => {
    if (selectedCardId) {
      // TODO: 실제 삭제 API 호출
      console.log("메시지 카드 삭제:", selectedCardId);
    }
    setShowDeleteModal(false);
    setSelectedCardId(null);
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
                <button className={styles.deleteButton}>
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
      />
    </div>
  );
};

export default MessageCardSection;
