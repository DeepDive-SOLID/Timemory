import { back_arrow } from "../../assets";
import styles from "../../styles/StatusBar.module.scss";
import { useNavigate } from "react-router-dom";

export interface StatusBarProps {
  to: string | number;
  title?: string;
  subtitle?: string;
  members?: string[];
}

const StatusBar = ({ to, title, subtitle, members }: StatusBarProps) => {
  const navigate = useNavigate();

  return (
    <div className={styles.statusBarWrapper}>
      <div className={styles.leftGroup}>
        <img
          src={back_arrow}
          alt="Back"
          className={styles.backArrow}
          onClick={() => {
            // 바로 전 화면
            if (to === -1) {
              navigate(-1);

            // 특정 경로
            } else if (typeof to === "string") {
              navigate(to);
            }
          }}
        />
        <div className={styles.statusText}>
          <h1 className={styles.title}>{title}</h1>
          {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
        </div>
      </div>

      {members && members.length > 0 && (
        <div className={styles.memberList}>
          {members.map((src, idx) => (
            <img
              key={idx}
              src={src}
              alt={`Member ${idx + 1}`}
              className={styles.memberAvatar}
            />
          ))}
        </div>
      )}
    </div>
  );
};
export default StatusBar;
