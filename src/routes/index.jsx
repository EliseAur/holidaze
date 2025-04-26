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

/**
 * Router configuration for the application.
 * Defines routes and their corresponding layouts and components.
 *
 * @example
 * import { router } from "./routes";
 * <RouterProvider router={router} />
 */
const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/home",
        element: <Home />,
      },
    ],
  },
  {
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
