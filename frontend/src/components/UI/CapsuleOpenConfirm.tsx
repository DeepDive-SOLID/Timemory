import React from "react";
import styles from "../../styles/DeleteConfirm.module.scss";

interface CapsuleOpenConfirmProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  isOpening?: boolean;
  cndt?: string;
}

const CapsuleOpenConfirm: React.FC<CapsuleOpenConfirmProps> = ({ isOpen, onClose, onConfirm, title = "캡슐을 열겠습니까?", isOpening = false, cndt }) => {
  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <h3 className={styles.modalTitle}>{title}</h3>
        <h2 className={styles.modalTitle}>{cndt}</h2>
        <p className={styles.modalMessage}>해당 조건을 완료하셨습니까 ?</p>
        <div className={styles.modalButtons}>
          <button className={styles.cancelButton} onClick={onClose} disabled={isOpening}>
            취소
          </button>
          <button className={styles.openButton} onClick={onConfirm} disabled={isOpening}>
            {isOpening ? "열리는 중..." : "열기"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CapsuleOpenConfirm;
