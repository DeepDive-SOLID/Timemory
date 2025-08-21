import styles from "../../styles/Card.module.scss";
import { lock } from "../../assets";

export interface CardProps {
  title: string;
  date: string;
  user: string;
  isOpen: boolean;
  onClick?: () => void;
}

const Card = ({ title, date, user, isOpen, onClick }: CardProps) => {
  return (
    <div
      className={`${styles.CardContainer} ${!isOpen ? styles.locked : ""}`}
      onClick={isOpen ? onClick : undefined}
    >
      {isOpen ? (
        <>
          <p className={styles.title}>{title}</p>
          <div className={styles.subtitle}>
            <p className={styles.date}>{date}</p>
            <p className={styles.user}>{user}</p>
          </div>
        </>
      ) : (
        <div className={styles.lockWrapper}>
          <img src={lock} alt="locked" className={styles.lockIcon} />
        </div>
      )}
    </div>
  );
};
export default Card;
