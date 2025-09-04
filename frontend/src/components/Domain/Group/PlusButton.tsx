import { plus_circle } from "../../../assets";
import style from "../../../styles/PlusButton.module.scss";

interface PlusButtonProps {
  setIsModalOpen: (prev: boolean) => void;
}
const PlusButton = ({ setIsModalOpen }: PlusButtonProps) => {
  return (
    <div className={style.imgBox}>
      <img src={plus_circle} alt='플러스 아이콘' onClick={() => setIsModalOpen(true)} />
    </div>
  );
};

export default PlusButton;
