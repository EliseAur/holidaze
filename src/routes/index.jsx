import { createBrowserRouter } from "react-router-dom";
import { Home } from "../pages";
import { HomeLayout } from "../layouts";

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
  // {
  //  Other layouts and pages that doesn't share the same structure and layout as Home and About
  // }
]);

export { router };
