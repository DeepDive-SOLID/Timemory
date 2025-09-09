import { Link } from "react-router-dom";
import style from "../../../styles/Alarm.module.scss";
import type { AlarmDto, AlarmModalProps } from "../../../types/home";
import { useAlarm } from "../../../contexts/AlarmContext";
import { useEffect, useState } from "react";

// api 연동 후 클릭 시 리스트에서 삭제하거나, 순서 변경 예정
const AlarmModal = ({ modalOpen, setModalOpen }: AlarmModalProps) => {
  const { data } = useAlarm();
  const [filter, setFilter] = useState<AlarmDto[]>();

  useEffect(() => {
    setFilter(data);
  }, [data]);

  if (!modalOpen) return null;
  const closeModal = () => setModalOpen(false);

  const buttonEvent = (capId: number) => {
    const newFilter = filter?.filter((item) => item.capId !== capId);
    setFilter(newFilter);
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
            {filter?.map((items) => (
              <div className={style.alarmList}>
                <Link to={`/detail/${items.capId}`} key={items.capId} id='link' className={style.title} onClick={closeModal}>
                  <div>{`${items.teamName}팀의 캡슐이 열렸습니다.`}</div>
                </Link>
                <button className={style.deleteButton} id='delete' onClick={() => buttonEvent(items.capId)}>
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
