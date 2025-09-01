import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";
import "./styles/index.scss";
import App from "./App.tsx";
import Login from "./pages/Login.tsx";
import Home from "./pages/Home.tsx";
import GroupList from "./pages/GroupList.tsx";
import NickName from "./pages/NickName.tsx";
import { AuthProvider } from "./contexts/AuthProvider.tsx";
import QuizDate from "./pages/Quiz/QuizDate.tsx";
import QuizLocation from "./pages/Quiz/QuizLocation.tsx";
import QuizCondition from "./pages/Quiz/QuizCondition.tsx";
import GroupCapsule from "./pages/GroupCapsule.tsx";
import CapsuleDetail from "./pages/CapsuleDetail.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Login />,
      },
      {
        path: "login/kakao/callback",
        element: <Login />,
      },
      {
        path: "nickname",
        element: <NickName />,
      },
      {
        path: "home",
        element: <Home />,
      },
      {
        path: "date/:teamId",
        element: <QuizDate />,
      },
      {
        path: "location/:teamId",
        element: <QuizLocation />,
      },
      {
        path: "condition/:teamId",
        element: <QuizCondition />,
      },
      {
        path: "group",
        element: <GroupList />,
      },
      {
        path: "group/:groupId",
        element: <GroupCapsule />,
      },
      {
        path: "detail",
        element: <CapsuleDetail />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <AuthProvider>
    <RouterProvider router={router} />
  </AuthProvider>
);
