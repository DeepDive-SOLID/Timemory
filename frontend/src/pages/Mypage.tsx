import { profile_img, option } from "../assets";
import TabBar from "../components/APP/TabBar";
import styles from "../styles/mypage.module.scss";
import { useNavigate } from "react-router-dom";

const Mypage = () => {
  const navigate = useNavigate();
  return (
    <div>
      <p className={styles.header}>MY PAGE</p>
      <div className={styles.profile}>
        <img src={profile_img} alt="profile" className={styles.profileImg} />

        <div className={styles.nicknameWrapper}>
          <p className={styles.nickname}>나옹</p>
        </div>

        <img
          src={option}
          alt="option"
          className={styles.option}
          onClick={() => navigate("/editinfo")}
        />
      </div>

      <div className={styles.infoContents}>
        <div className={styles.info}>
          <div className={styles.title}>NAME</div>
          <div className={styles.content}>이나영</div>
        </div>
        <div className={styles.info}>
          <div className={styles.title}>EMAIL</div>
          <div className={styles.content}>example.gmail.com</div>
        </div>
        <div className={styles.info}>
          <div className={styles.title}>PHONE</div>
          <div className={styles.content}>010-0000-0000</div>
        </div>
        <div className={styles.info}>
          <div className={styles.title}>BIRTH</div>
          <div className={styles.content}>2000.00.00</div>
        </div>
      </div>
      <TabBar />
    </div>
  );
};
export default Mypage;
