import { Outlet } from "react-router";
import styles from "./styles/App.module.scss";

export default function App() {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <Outlet />
      </div>
    </div>
  );
}
