import { createBrowserRouter } from "react-router-dom";
import {
  Home,
  Login,
  Register,
  VenueDetail,
  Venues,
  Account,
  Favorites,
} from "../pages";
import { HomeLayout, BgPalmsLayout, MainLayout } from "../layouts";

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
  {
    path: "/venue/:id",
    element: <MainLayout />,
    children: [
      {
        path: "/venue/:id",
        element: <VenueDetail />,
      },
    ],
  },
  {
    path: "/venues",
    element: <MainLayout />,
    children: [
      {
        path: "/venues",
        element: <Venues />,
      },
    ],
  },
  {
    path: "/account",
    element: <MainLayout />,
    children: [
      {
        path: "/account",
        element: <Account />,
      },
    ],
  },
  {
    path: "/favorites",
    element: <MainLayout />,
    children: [
      {
        path: "/favorites",
        element: <Favorites />,
      },
    ],
  },
]);

export { router };
