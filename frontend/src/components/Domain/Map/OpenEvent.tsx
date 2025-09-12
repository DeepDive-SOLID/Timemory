import style from "../../../styles/OpenEvent.module.scss";

interface OpenEventProps {
  distance: number;
  setAnimation: (b: boolean) => void;
  setOpenModal: (b: boolean) => void;
}
const OpenEvent = ({ distance, setOpenModal, setAnimation }: OpenEventProps) => {
  return (
    <div className={style.wrapper}>
      <div className={style.contentBox}>
        <p>{`${Math.floor(distance)} 미터안에 캡슐이 열렸습니다 !`}</p>
        <button
          className={style.button}
          onClick={() => {
            setAnimation(true);
            setOpenModal(false);
          }}
        >
          캡슐 열기
        </button>
      </div>
    </div>
  );
};

export default OpenEvent;
