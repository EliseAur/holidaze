import { createBrowserRouter } from "react-router-dom";
import { Home, Login, Register } from "../pages";
import { HomeLayout, BgPalmsLayout } from "../layouts";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },

      //Other routes that share the same structure as the Home route (HeaderWithHero, Outlet, Footer)
    ],
  },
  {
    // Other layouts and pages that doesn't share the same structure and layout as Home and About
    path: "/login",
    element: <BgPalmsLayout />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
      // {
      //   path: "/register",
      //   element: <Register />,
      // },
    ],
  },
  {
    path: "/register",
    element: <BgPalmsLayout />,
    children: [
      {
        path: "/register",
        element: <Register />,
      },
    ],
  },
]);

export { router };
