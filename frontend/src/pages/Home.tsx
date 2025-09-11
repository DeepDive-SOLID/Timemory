import TabBar from "../components/APP/TabBar";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <Link to="/">로그인 페이지 이동</Link>
      <br />
      <Link to="/group">그룹 목록 페이지 이동</Link>
      <TabBar />
    </div>
  );
};

export default Home;
