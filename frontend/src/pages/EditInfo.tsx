import styles from "../styles/EditInfo.module.scss";
import { profile_img, camera } from "../assets";
import TabBar from "../components/APP/TabBar";

const EditInfo = () => {
  return (
    <div>
      <p className={styles.header}>MY PAGE</p>
      <div className={styles.profile}>
        <div className={styles.ImgWrapper}>
          <img src={profile_img} alt="profile" className={styles.profileImg} />
          <img src={camera} alt="camera" className={styles.camera} />
        </div>

        <p className={styles.nickname}>나옹</p>
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

      <div className={styles.logoutButton}>로그아웃</div>
      <div className={styles.deleteButton}>회원탈퇴</div>

      <TabBar />
    </div>
  );
};
export default EditInfo;
