import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";
import "./styles/index.scss";
import App from "./App.tsx";
import Login from "./pages/Login.tsx";
import Home from "./pages/Home.tsx";
import GroupList from "./pages/GroupList.tsx";
import NickName from "./pages/NickName.tsx";
import { AuthProvider } from "./contexts/AuthProvider.tsx";

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
        path: "groups",
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
