import { Link } from "react-router-dom";
import TabBar from "../components/APP/TabBar";

const Home = () => {
  return (
    <div>
      홈화면 입니다
      <Link to="/">로그인 페이지 이동</Link>
      <TabBar />
    </div>
  );
};

export default Home;
