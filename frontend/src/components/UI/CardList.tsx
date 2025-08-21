import Card from "./Card";
import styles from "../../styles/Card.module.scss";
import { useNavigate } from "react-router-dom";

const CardList = () => {
  const navigate = useNavigate();

  const cards = [
    {
      title: "메리 크리스마스",
      date: "2025.12.25",
      user: "나옹",
      isOpen: true,
    },
    {
      title: "메리 크리스마스",
      date: "2025.12.25",
      user: "나옹",
      isOpen: false,
    },
    {
      title: "메리 크리스마스메리 크리스마스메리 크리스마스",
      date: "2025.12.25",
      user: "나옹",
      isOpen: true,
    },
    {
      title: "메리 크리스마스",
      date: "2025.12.25",
      user: "나옹",
      isOpen: false,
    },
    {
      title: "메리 크리스마스",
      date: "2025.12.25",
      user: "나옹",
      isOpen: true,
    },
    {
      title: "메리 크리스마스",
      date: "2025.12.25",
      user: "나옹",
      isOpen: false,
    },
    {
      title: "메리 크리스마스메리 크리스마스메리 크리스마스",
      date: "2025.12.25",
      user: "나옹",
      isOpen: true,
    },
    {
      title: "메리 크리스마스",
      date: "2025.12.25",
      user: "나옹",
      isOpen: false,
    },
    {
      title: "메리 크리스마스",
      date: "2025.12.25",
      user: "나옹",
      isOpen: true,
    },
    {
      title: "메리 크리스마스",
      date: "2025.12.25",
      user: "나옹",
      isOpen: false,
    },
    {
      title: "메리 크리스마스메리 크리스마스메리 크리스마스",
      date: "2025.12.25",
      user: "나옹",
      isOpen: true,
    },
    {
      title: "메리 크리스마스",
      date: "2025.12.25",
      user: "나옹",
      isOpen: false,
    },
  ];

  return (
    <div className={styles.ListContainer}>
      <div className={styles.ListHeader}>
        <p className={styles.ListTitle}>OPEN LIST</p>
        <span className={styles.ListCount}>({cards.length})</span>
      </div>

      <div className={styles.CardGrid}>
        {cards.map((card, idx) => (
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
