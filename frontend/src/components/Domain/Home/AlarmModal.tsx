import { Link } from "react-router-dom";
import style from "../../../styles/Alarm.module.scss";
import type { AlarmModalProps } from "../../../types/home";
import { useAlarm } from "../../../contexts/AlarmContext";

// api 연동 후 클릭 시 리스트에서 삭제하거나, 순서 변경 예정
const AlarmModal = ({ modalOpen, setModalOpen }: AlarmModalProps) => {
  const { data, handleLinkClick } = useAlarm();
  if (!modalOpen) return null;

  const closeModal = () => setModalOpen(false);
  const handleClick = (capId: number) => {
    handleLinkClick(capId);
    closeModal(); // 클릭 후 모달 닫기
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
              <Link to={`/detail/${items.capId}`} key={items.capId} id='link' className={style.title} onClick={() => handleClick(items.capId)}>
                <div>{`${items.teamName}팀의 캡슐이 열렸습니다.`}</div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default AlarmModal;
