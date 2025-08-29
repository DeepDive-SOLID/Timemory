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
import { useNavigate, useLocation } from "react-router-dom";

type TabKey = "home" | "group" | "capsule" | "mypage";
type TabBarProps = {
  key: TabKey;
  label: string;
  inactive: string;
  active: string;
  path: string;
  matches: (pathname: string) => boolean;
};

const tabs: TabBarProps[] = [
  {
    key: "home",
    label: "Home",
    inactive: home_tab,
    active: home_active,
    path: "/home",
    matches: (p) => p === "/" || p.startsWith("/home"),
  },
  {
    key: "group",
    label: "Group",
    inactive: group_tab,
    active: group_active,
    path: "/group",
    matches: (p) => p.startsWith("/group"),
  },
  {
    key: "capsule",
    label: "Capsule",
    inactive: capsule_tab,
    active: capsule_active,
    path: "/mycapsule",
    matches: (p) => p.startsWith("/mycapsule") || p.startsWith("/capsule"),
  },
  {
    key: "mypage",
    label: "My",
    inactive: mypage_tab,
    active: mypage_active,
    path: "/mypage",
    matches: (p) => p.startsWith("/mypage") || p.startsWith("/editinfo"),
  },
];

const TabBar = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const activeKey: TabKey =
    tabs.find((t) => t.matches(pathname))?.key ?? "home";

  return (
    <div className={styles.tabBarWrapper}>
      {tabs.map(({ key, label, inactive, active, path }) => {
        const isActive = activeKey === key;
        return (
          <button
            key={key}
            className={`${styles.tab} ${isActive ? styles.active : ""}`}
            onClick={() => navigate(path)}
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
