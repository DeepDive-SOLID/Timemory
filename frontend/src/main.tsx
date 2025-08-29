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
import OpenList from "./pages/OpenList.tsx";
import QuizOpen from "./pages/Quiz/QuizOpen.tsx";

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
        path: "date", 
        element: <QuizDate /> 
      },
      { 
        path: "location", 
        element: <QuizLocation /> 
      },
      { 
        path: "condition", 
        element: <QuizCondition /> 
      },
      { 
        path: "openlist/:eventId", 
        element: <OpenList /> 
      },
      { 
        path: "quiz/:eventId", 
        element: <QuizOpen /> 
      },
      {
        path: "group",
        element: <GroupList />,
      },

    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <AuthProvider>
    <RouterProvider router={router} />
  </AuthProvider>
);
