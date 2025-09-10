import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";
import "./styles/index.scss";
import App from "./App.tsx";
import { Provider } from "react-redux";
import { AuthProvider } from "./contexts/AuthProvider.tsx";
import index from "./store/index.ts";
import Login from "./pages/Login.tsx";
import Home from "./pages/Home.tsx";
import LocationCapsule from "./pages/LocationCapsule.tsx";
import SearchLocation from "./pages/SearchLocation.tsx";
import NickName from "./pages/NickName.tsx";
import Mypage from "./pages/Mypage.tsx";
import EditInfo from "./pages/EditInfo.tsx";
import GroupList from "./pages/GroupList.tsx";
import QuizDate from "./pages/Quiz/QuizDate.tsx";
import QuizLocation from "./pages/Quiz/QuizLocation.tsx";
import QuizCondition from "./pages/Quiz/QuizCondition.tsx";
import OpenList from "./pages/OpenList.tsx";
import QuizOpen from "./pages/Quiz/QuizOpen.tsx";
import GroupCapsule from "./pages/GroupCapsule.tsx";
import Splash from "./pages/Splash.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Splash />,
      },
      {
        path: "login",
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
        path: "capsuleMap/:groupId",
        element: <LocationCapsule />,
      },
      {
        path: "map",
        element: <SearchLocation />,
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
        path: "openlist/:eventId",
        element: <OpenList />,
      },
      {
        path: "quiz/:eventId",
        element: <QuizOpen />,
      },
      {
        path: "mypage",
        element: <Mypage />,
      },
      {
        path: "editinfo",
        element: <EditInfo />,
      },
      {
        path: "group/:groupId",
        element: <GroupCapsule />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <AuthProvider>
    <Provider store={index}>
      <RouterProvider router={router} />
    </Provider>
  </AuthProvider>
);
