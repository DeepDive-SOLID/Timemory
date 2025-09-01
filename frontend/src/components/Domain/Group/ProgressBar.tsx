import style from "../../../styles/ProgressBar.module.scss";

interface ProgressBarProps {
  scrollProgress: number;
}
const ProgressBar = ({ scrollProgress }: ProgressBarProps) => {
  return (
    <div className={style.progressBar}>
      <div className={style.progressFill} style={{ width: `${scrollProgress}%` }} />
    </div>
  );
};

export default ProgressBar;
