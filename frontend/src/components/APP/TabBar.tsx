import {
  group_active,
  group_tab,
  home_active,
  home_tab,
  capsule_active,
  capsule_tab,
  mypage_active,
  mypage_tab,
} from "../../assets";
import styles from "../../styles/TabBar.module.scss";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

type TabBarProps = {
  key: "home" | "group" | "capsule" | "mypage";
  label: string;
  inactive: string;
  active: string;
  path: string;
};

const tabs: TabBarProps[] = [
  {
    key: "home",
    label: "Home",
    inactive: home_tab,
    active: home_active,
    path: "/home",
  },
  {
    key: "group",
    label: "Group",
    inactive: group_tab,
    active: group_active,
    path: "/group",
  },
  {
    key: "capsule",
    label: "Capsule",
    inactive: capsule_tab,
    active: capsule_active,
    path: "/mycapsule",
  },
  {
    key: "mypage",
    label: "My",
    inactive: mypage_tab,
    active: mypage_active,
    path: "/mypage",
  },
];

const TabBar = () => {
  const [activeTab, setActiveTab] = useState<TabBarProps["key"]>("home");
  const navigate = useNavigate();

  return (
    <div className={styles.tabBarWrapper}>
      {tabs.map(({ key, label, inactive, active, path }) => {
        const isActive = activeTab === key;
        return (
          <button
            key={key}
            className={`${styles.tab} ${isActive ? styles.active : ""}`}
            onClick={() => {
              setActiveTab(key);
              navigate(path);
            }}
            type="button"
          >
            <img
              src={isActive ? active : inactive}
              className={styles.tabImg}
              alt={label}
              draggable={false}
            />
            <span className={styles.tabTitle}>{label}</span>
          </button>
        );
      })}
    </div>
  );
};
export default TabBar;
