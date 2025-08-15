import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div>
      로그인 페이지 입니다
      <Link to="/home">홈화면 이동</Link>
      <br />
      <Link to="/groups">그룹 목록 페이지 이동</Link>
    </div>
  );
};

export default Login;
