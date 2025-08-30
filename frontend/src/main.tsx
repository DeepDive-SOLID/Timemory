import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";
import "./styles/index.scss";
import App from "./App.tsx";
import Login from "./pages/Login.tsx";
import Home from "./pages/Home.tsx";
import LocationCapsule from "./pages/LocationCapsule.tsx";
import SearchLocation from "./pages/SearchLocation.tsx";
import { Provider } from "react-redux";
import index from "./store/index.ts";
import NickName from "./pages/NickName.tsx";
import { AuthProvider } from "./contexts/AuthProvider.tsx";
import GroupInner from "./pages/GroupInner.tsx";

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
        path: "capsuleMap",
        element: <LocationCapsule />,
      },
      {
        path: "map",
        element: <SearchLocation />,
      },
      {
        path: "groupInner",
        element: <GroupInner />,
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
