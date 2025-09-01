import React, { useState, useRef, useEffect } from "react";
import styles from "../../styles/MyCapsule.module.scss";
import { lock, x_circle } from "../../assets/index.ts";
import type { Capsule } from "../../types/capsule";
import DeleteConfirm from "../UI/DeleteConfirm";
import { deleteCapsuleApi } from "../../api/capsuleApi";

interface CapsuleSliderProps {
  capsules: Capsule[];
  onCapsuleDeleted?: () => void;
}

const CapsuleSlider: React.FC<CapsuleSliderProps> = ({
  capsules,
  onCapsuleDeleted,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [currentX, setCurrentX] = useState(0);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedCapsuleId, setSelectedCapsuleId] = useState<number | null>(
    null
  );
  const [isDeleting, setIsDeleting] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);

  // 남은 일수 계산
  const getDaysRemaining = (openDate: string) => {
    const currentDate = new Date();
    const openDateTime = new Date(openDate);
    const diffTime = openDateTime.getTime() - currentDate.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % capsules.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + capsules.length) % capsules.length);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.clientX);
    setCurrentX(e.clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setCurrentX(e.clientX);
  };

  const handleMouseUp = () => {
    if (!isDragging) return;

    const diff = startX - currentX;
    const threshold = 50; // 슬라이드 감지 임계값

    if (Math.abs(diff) > threshold) {
      if (diff > 0) {
        // 왼쪽으로 드래그 - 다음 슬라이드
        nextSlide();
      } else {
        // 오른쪽으로 드래그 - 이전 슬라이드
        prevSlide();
      }
    }

    setIsDragging(false);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    setStartX(e.touches[0].clientX);
    setCurrentX(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    setCurrentX(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!isDragging) return;

    const diff = startX - currentX;
    const threshold = 50;

    if (Math.abs(diff) > threshold) {
      if (diff > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }

    setIsDragging(false);
  };

  // 마우스가 슬라이더 밖으로 나가면 드래그 중단
  useEffect(() => {
    const handleMouseLeave = () => {
      if (isDragging) {
        setIsDragging(false);
      }
    };

    const element = sliderRef.current;
    if (element) {
      element.addEventListener("mouseleave", handleMouseLeave);
      return () => element.removeEventListener("mouseleave", handleMouseLeave);
    }
  }, [isDragging]);

  const handleDeleteClick = (capsuleId: number) => {
    setSelectedCapsuleId(capsuleId);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    if (selectedCapsuleId && !isDeleting) {
      try {
        setIsDeleting(true);
        await deleteCapsuleApi(selectedCapsuleId);

        // 삭제 성공 시 부모 컴포넌트에 알림
        if (onCapsuleDeleted) {
          onCapsuleDeleted();
        }

        // 모달 닫기
        setShowDeleteModal(false);
        setSelectedCapsuleId(null);

        // 삭제 성공 메시지
        alert("캡슐이 성공적으로 삭제되었습니다.");
      } catch (error) {
        // 에러 메시지 표시
        const errorMessage =
          error instanceof Error
            ? error.message
            : "캡슐 삭제 중 오류가 발생했습니다.";
        alert(errorMessage);
      } finally {
        setIsDeleting(false);
      }
    }
  };

  const handleDeleteCancel = () => {
    setShowDeleteModal(false);
    setSelectedCapsuleId(null);
  };

  return (
    <div className={styles.capsuleSection}>
      <div
        className={styles.capsuleSlider}
        ref={sliderRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className={styles.cardsContainer}>
          {capsules.map((capsule, index) => {
            const isLocked = !capsule.isOpened;
            const daysRemaining = getDaysRemaining(capsule.openDate);

            return (
              <div
                key={capsule.capsuleId}
                className={`${styles.capsuleCard} ${
                  index === currentIndex ? styles.active : styles.inactive
                } ${isLocked ? styles.locked : ""}`}
                style={{
                  transform: `translateX(${
                    (index - currentIndex) * 310
                  }px) rotateY(${(index - currentIndex) * 15}deg) scale(${
                    index === currentIndex ? 1 : 0.85
                  })`,
                  cursor: isDragging ? "grabbing" : "grab",
                }}
              >
                <div className={styles.cardHeader}>
                  <h3>{capsule.content}</h3>
                  <button
                    className={styles.closeBtn}
                    onClick={() => handleDeleteClick(capsule.capsuleId)}
                  >
                    ×
                  </button>
                </div>
                {capsule.imageUrl && (
                  <div className={styles.cardImage}>
                    <img
                      src={capsule.imageUrl}
                      alt={capsule.content}
                      className={styles.cardImage}
                    />
                  </div>
                )}
                <div className={styles.cardFooter}>
                  <div className={styles.hashtags}>
                    {capsule.tag.split(",").map((tag, tagIndex) => (
                      <span key={tagIndex} className={styles.hashtag}>
                        #{tag.trim()}
                      </span>
                    ))}
                  </div>
                  <div className={styles.dates}>
                    <div className={styles.dateRow}>
                      <span>작성일자</span>
                      <span>
                        {new Date(capsule.createdAt).toLocaleDateString(
                          "ko-KR"
                        )}
                      </span>
                    </div>
                    <div className={styles.dateRow}>
                      <span>열림일자</span>
                      <span>
                        {new Date(capsule.openDate).toLocaleDateString("ko-KR")}
                      </span>
                    </div>
                  </div>
                </div>

                {isLocked && (
                  <>
                    <button
                      className={styles.closeButton}
                      onClick={() => handleDeleteClick(capsule.capsuleId)}
                    >
                      <img src={x_circle} alt="close" />
                    </button>
                    <div className={styles.lockOverlay}>
                      <div className={styles.capsuleLockIcon}>
                        <img src={lock} alt="lock" />
                      </div>
                      <div className={styles.daysRemaining}>
                        D-{daysRemaining}
                      </div>
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className={styles.pagination}>
        {capsules.map((_, index) => (
          <span
            key={index}
            className={`${styles.dot} ${
              index === currentIndex ? styles.active : ""
            }`}
            onClick={() => goToSlide(index)}
          ></span>
        ))}
      </div>

      <DeleteConfirm
        isOpen={showDeleteModal}
        onClose={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
        isDeleting={isDeleting}
      />
    </div>
  );
};

export default CapsuleSlider;
