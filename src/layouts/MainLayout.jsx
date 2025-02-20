import { HeaderBgPalmsScreen, Footer } from "../components";
import { Outlet } from "react-router-dom";

function MainLayout() {
  return (
    <div>
      <HeaderBgPalmsScreen />
      <Outlet />
      <Footer />
    </div>
  );
}

export default MainLayout;
