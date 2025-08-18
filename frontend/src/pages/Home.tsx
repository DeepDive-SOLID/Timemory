import { Link } from "react-router-dom";
import TabBar from "../components/APP/TabBar";
import InputBox from "../components/UI/InputBox";

const Home = () => {
  return (
    <div>
      <InputBox input="답변 작성" warning="자동으로 AI 검열" svgBox="lg" />
      <Link to="/">로그인 페이지 이동</Link>
      <TabBar />
    </div>
  );
};

export default Home;
