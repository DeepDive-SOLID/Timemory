import React from "react";
import styles from "../../styles/DeleteConfirm.module.scss";

interface CapsuleOpenConfirmProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  isOpening?: boolean;
}

const CapsuleOpenConfirm: React.FC<CapsuleOpenConfirmProps> = ({ isOpen, onClose, onConfirm, title = "캡슐을 열겠습니까?", isOpening = false }) => {
  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <h3 className={styles.modalTitle}>{title}</h3>
        <p className={styles.modalMessage}>본인의 양심에 맡겨 열리는 캡슐입니다.</p>
        <div className={styles.modalButtons}>
          <button className={styles.cancelButton} onClick={onClose} disabled={isOpening}>
            취소
          </button>
          <button className={styles.confirmButton} onClick={onConfirm} disabled={isOpening}>
            {isOpening ? "열리는 중..." : "열기"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CapsuleOpenConfirm;
