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
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <Provider store={index}>
    <RouterProvider router={router} />
  </Provider>
);
