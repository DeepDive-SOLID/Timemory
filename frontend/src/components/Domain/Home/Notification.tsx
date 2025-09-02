import { useAlarm } from "../../../contexts/AlarmContext";
import style from "../../../styles/Notification.module.scss";

const Notification = () => {
  const { data } = useAlarm();
  const count = data.map((a) => a.click === false);
  return <div className={style.wrapper}>{count.length}</div>;
};

export default Notification;
