import NoCapsule from "../components/Domain/Home/NoCapsule";
import TabBar from "../components/APP/TabBar";
import HasCapsule from "../components/Domain/Home/HasCapsule";

// api 요청 후 수정 예정
const Home = () => {
  return (
    <div>
      {true ? <HasCapsule /> : <NoCapsule />}
      <TabBar />
    </div>
  );
};

export default Home;
