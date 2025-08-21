import StatusBar from "../components/APP/StatusBar";
import CardList from "../components/UI/CardList";
import styles from "../styles/OpenList.module.scss";
import { useParams, useNavigate } from "react-router-dom";
import { events } from "../constants/events";

const OpenList = () => {
  const { eventId } = useParams<{ eventId: string }>();
  const eventData = events.find((e) => e.id === eventId) || events[0];
  const navigate = useNavigate();

  return (
    <div>
      <StatusBar to={"/home"} />

      <div className={styles.stickySection}>
        <div className={styles.title}>{eventData.title}</div>
        <p className={styles.date}>{eventData.date}</p>
        <p className={styles.message}>{eventData.message}</p>
      </div>

      <div className={styles.contents}>
        <img src={eventData.image} alt="event" className={styles.listimg} />
        <div className={styles.button} onClick={() => navigate("/openquiz")}>
          {eventData.buttonText}
        </div>
      </div>

      <CardList />
    </div>
  );
};

export default OpenList;
