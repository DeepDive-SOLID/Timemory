import React from "react";
import styles from "../../styles/DeleteConfirm.module.scss";

interface DeleteConfirmProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
}

const DeleteConfirm: React.FC<DeleteConfirmProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title = "캡슐을 삭제하시겠습니까?",
}) => {
  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <h3 className={styles.modalTitle}>{title}</h3>
        <p className={styles.modalMessage}>삭제 시 복구 불가능합니다.</p>
        <div className={styles.modalButtons}>
          <button className={styles.cancelButton} onClick={onClose}>
            취소
          </button>
          <button className={styles.confirmButton} onClick={onConfirm}>
            삭제
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirm;
