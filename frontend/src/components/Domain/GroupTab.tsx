import styles from "../../styles/GroupTabs.module.scss";
import { plus_circle } from "../../assets";

export interface GroupTabsProps {
  activeTab: "my" | "all";
  onTabChange: (tab: "my" | "all") => void;
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
            activeTab === "all" ? styles.active : ""
          }`}
          onClick={() => onTabChange("all")}
        >
          ALL TEAMS
        </button>
        <button className={styles.addButton} onClick={onAddGroup}>
          <img src={plus_circle} alt="Add group" />
        </button>
      </div>
    </div>
  );
};

export default GroupTabs;
