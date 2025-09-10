import { useAlarm } from "../../../contexts/AlarmContext";
import style from "../../../styles/Notification.module.scss";

const Notification = () => {
  const { data } = useAlarm();
  return <div className={style.wrapper}>{data.length}</div>;
};

export default Notification;
