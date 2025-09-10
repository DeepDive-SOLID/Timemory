import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../../styles/MyCapsule.module.scss";
import { lock, x_circle } from "../../assets/index.ts";
import type { MessageCard } from "../../types/capsule";
import DeleteConfirm from "../UI/DeleteConfirm";
import { deleteCapsuleApi } from "../../api/MyCapsuleApi";
import CapsuleOpenConfirm from "../UI/CapsuleOpenConfirm.tsx";
import { getCapsuleCndtListApi } from "../../api/open.ts";

interface MessageCardSectionProps {
  cards: MessageCard[];
  onCapsuleDeleted?: () => void;
}

const MessageCardSection: React.FC<MessageCardSectionProps> = ({
  cards,
  onCapsuleDeleted,
}) => {
  const navigate = useNavigate();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedCardId, setSelectedCardId] = useState<number | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const [isOpening, setIsOpening] = useState(false);
  const [showCapsuleModal, setShowCapsuleModal] = useState(false);

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

  // 캡슐 클릭 핸들러 (열린 캡슐만 상세 페이지로 이동)
  const handleCardClick = (card: MessageCard) => {
    if (card.isOpened) {
      navigate(`/detail/${card.id}`);
    }
  };
  const handleCapusleOpen = (cardId: number) => {
    setSelectedCardId(cardId);
    setShowCapsuleModal((prev) => !prev);
  };
  const handleCapsuleOpenCancel = () => {
    setShowCapsuleModal(false);
    setSelectedCardId(null);
  };

  const handleCapsuleOpen = async () => {
    if (selectedCardId && !isDeleting) {
      try {
        setIsOpening(true);
        await getCapsuleCndtListApi(selectedCardId);
        // 삭제 성공 시 부모 컴포넌트에 알림
        if (onCapsuleDeleted) {
          onCapsuleDeleted();
        }
        // 모달 닫기
        setShowCapsuleModal(false);
        setSelectedCardId(null);
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "캡슐 오픈 중 오류가 발생했습니다.";
        alert(errorMessage);
      }
    }
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
              style={{
                cursor: card.isOpened ? "pointer" : "default",
              }}
              onClick={() => handleCardClick(card)}
            >
              {isLocked && (
                <button
                  className={styles.closeButton}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteClick(card.id);
                  }}
                >
                  <img src={x_circle} alt='close' />
                </button>
              )}
              {isLocked && (
                <button
                  className={styles.capsuleOpenButton}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCapusleOpen(card.id);
                  }}
                >
                  캡슐 열기
                </button>
              )}

              <div className={styles.messageContent}>
                <p className={styles.messageText}>{card.message}</p>

                {card.image && (
                  <div className={styles.messageImage}>
                    <img src={card.image} alt='message' />
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
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteClick(card.id);
                  }}
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

      <DeleteConfirm isOpen={showDeleteModal} onClose={handleDeleteCancel} onConfirm={handleDeleteConfirm} title='메시지를 삭제하시겠습니까?' isDeleting={isDeleting} />
      <CapsuleOpenConfirm isOpen={showCapsuleModal} onClose={handleCapsuleOpenCancel} onConfirm={handleCapsuleOpen} title='캡슐을 열겠습니까?' isOpening={isOpening} />
    </div>
  );
};

export default MessageCardSection;
