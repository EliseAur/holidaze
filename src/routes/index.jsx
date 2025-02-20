import { createBrowserRouter } from "react-router-dom";
import { Home } from "../pages";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
]);

export { router };
