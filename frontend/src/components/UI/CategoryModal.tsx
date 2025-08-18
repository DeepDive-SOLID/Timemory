import {
  xcircle,
  calendar,
  lightbulb,
  map_pin,
  calendar_white,
  lightbulb_white,
  map_pin_white,
} from "../../assets";
import styles from "../../styles/CategoryModal.module.scss";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export interface CategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CategoryModal = ({ isOpen, onClose }: CategoryModalProps) => {
  const [activeCategory, setActiveCategory] = useState<
    "date" | "location" | "condition"
  >();

  const navigate = useNavigate();

  if (!isOpen) return null;

  return (
    <div className={styles.modalContainer}>
      <div className={styles.modalHeader}>
        <p className={styles.modalTitle}>캡슐 생성</p>
        <img
          src={xcircle}
          alt="Close"
          className={styles.closeIcon}
          onClick={onClose}
        />
      </div>
      <div className={styles.modalContent}>
        <p className={styles.modalComment}>캡슐 등록 카테고리 선택</p>

        <div
          className={`${styles.categoryOption} ${
            activeCategory === "date" ? styles.active : ""
          }`}
          onClick={() => navigate("/date")}
        >
          <img
            src={activeCategory === "date" ? calendar_white : calendar}
            alt="Calendar"
            className={styles.categoryIcon}
          />
          <span className={styles.categoryText}>날짜</span>
        </div>

        <div
          className={`${styles.categoryOption} ${
            activeCategory === "location" ? styles.active : ""
          }`}
          onClick={() => navigate("/location")}
        >
          <img
            src={activeCategory === "location" ? map_pin_white : map_pin}
            alt="Map Pin"
            className={styles.categoryIcon}
          />
          <span className={styles.categoryText}>위치</span>
        </div>

        <div
          className={`${styles.categoryOption} ${
            activeCategory === "condition" ? styles.active : ""
          }`}
          onClick={() => navigate("/condition")}
        >
          <img
            src={activeCategory === "condition" ? lightbulb_white : lightbulb}
            alt="Lightbulb"
            className={styles.categoryIcon}
          />
          <span className={styles.categoryText}>조건</span>
        </div>
      </div>
    </div>
  );
};

export default CategoryModal;
