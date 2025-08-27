import { Link } from "react-router-dom";
import TabBar from "../components/APP/TabBar";
import CategoryModal from "../components/UI/CategoryModal";

const Home = () => {
  return (
    <div>
      <CategoryModal isOpen={true} onClose={() => {}} teamId={group.id} />
      <Link to="/">로그인 페이지 이동</Link>
      <TabBar />
    </div>
  );
};

export default Home;
