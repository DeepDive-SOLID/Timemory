import { Link } from "react-router-dom";
import style from "../../../styles/Alarm.module.scss";

interface AlarmModalProps {
  modalOpen: boolean;
  setModalOpen: (check: boolean) => void;
}
// api 연동 후 클릭 시 리스트에서 삭제하거나, 순서 변경 예정
const AlarmModal = ({ modalOpen, setModalOpen }: AlarmModalProps) => {
  const clickEvent = () => {
    setModalOpen(false);
  };
  const test = [
    {
      teamId: 1,
      capsuleId: 1,
      title: "solid팀의 캡슐이 열렸습니다.",
    },
    {
      teamId: 1,
      capsuleId: 2,
      title: "solid팀의 캡슐이 열렸습니다.",
    },
    {
      teamId: 1,
      capsuleId: 3,
      title: "solid팀의 캡슐이 열렸습니다.",
    },
    {
      teamId: 1,
      capsuleId: 4,
      title: "solid팀의 캡슐이 열렸습니다.",
    },
  ];
  return (
    <>
      {modalOpen && (
        <div className={`${style.wrapper} ${style.active}`}>
          <div className={style.header}>
            <h4>알림</h4>
            <button className={style.button} onClick={() => clickEvent()}>
              X
            </button>
          </div>
          <div className={style.titlebox}>
            {test.map((items) => (
              <Link to={`/test-${items.capsuleId}`} key={items.capsuleId} className={style.title}>
                <div>{items.title}</div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default AlarmModal;
