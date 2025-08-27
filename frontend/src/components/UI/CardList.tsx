import Card from "./Card";
import styles from "../../styles/Card.module.scss";
import { useNavigate } from "react-router-dom";

export interface CardItem {
  title: string;
  date: string;
  user: string;
  isOpen: boolean;
  onClick?: () => void;
}

interface CardListProps {
  items: CardItem[];
}

const CardList = ({ items }: CardListProps) => {
  const navigate = useNavigate();

  return (
    <div className={styles.ListContainer}>
      <div className={styles.ListHeader}>
        <p className={styles.ListTitle}>OPEN LIST</p>
        <span className={styles.ListCount}>({items.length})</span>
      </div>

      <div className={styles.CardGrid}>
        {items.map((card, idx) => (
          <Card
            key={idx}
            {...card}
            onClick={
              card.isOpen ? () => navigate(`/capsule/${idx}`) : undefined
            }
          />
        ))}
      </div>
    </div>
  );
};

export default CardList;
