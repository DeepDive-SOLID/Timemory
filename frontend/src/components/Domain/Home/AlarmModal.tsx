import { Link } from "react-router-dom";
import style from "../../../styles/Alarm.module.scss";
import type { AlarmModalProps } from "../../../types/home";
import { useAlarm } from "../../../contexts/AlarmContext";
import { deleteAlarmApi } from "../../../api/alarm";

// api 연동 후 클릭 시 리스트에서 삭제하거나, 순서 변경 예정
const AlarmModal = ({ modalOpen, setModalOpen }: AlarmModalProps) => {
  const { data, setData } = useAlarm();

  if (!modalOpen) return null;
  const closeModal = () => setModalOpen(false);

  const buttonEvent = async (alarmId: number) => {
    try {
      await deleteAlarmApi(alarmId);
      const filter = data?.filter((i) => i.alarmId !== alarmId);
      setData(filter);
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <>
      {modalOpen && (
        <div className={`${style.wrapper} ${style.active}`}>
          <div className={style.header}>
            <h4>알림</h4>
            <button className={style.button} id='modal' onClick={closeModal}>
              X
            </button>
          </div>
          <div className={style.titlebox}>
            {data.map((items) => (
              <div className={style.alarmList} key={items.capId}>
                <Link to={`/detail/${items.capId}`} id='link' className={style.title} onClick={closeModal}>
                  <div>{`${items.teamName}팀의 캡슐이 열렸습니다.`}</div>
                </Link>
                <button className={style.deleteButton} id='delete' onClick={() => buttonEvent(items.alarmId)}>
                  x
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default AlarmModal;
