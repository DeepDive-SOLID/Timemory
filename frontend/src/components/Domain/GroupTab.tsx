import styles from "../../styles/GroupTabs.module.scss";
import { plus_circle } from "../../assets";

interface GroupTabsProps {
  activeTab: "my" | "open";
  onTabChange: (tab: "my" | "open") => void;
  onAddGroup?: () => void;
}

const GroupTabs = ({ activeTab, onTabChange, onAddGroup }: GroupTabsProps) => {
  return (
    <div className={styles.tabContainer}>
      <div className={styles.tabs}>
        <button
          className={`${styles.tab} ${activeTab === "my" ? styles.active : ""}`}
          onClick={() => onTabChange("my")}
        >
          MY GROUP
        </button>
        <button
          className={`${styles.tab} ${
            activeTab === "open" ? styles.active : ""
          }`}
          onClick={() => onTabChange("open")}
        >
          OPEN GROUP
        </button>
        <button className={styles.addButton} onClick={onAddGroup}>
          <img src={plus_circle} alt="Add group" />
        </button>
      </div>
    </div>
  );
};

export default GroupTabs;
