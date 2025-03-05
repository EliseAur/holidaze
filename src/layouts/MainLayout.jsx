import { Outlet } from "react-router-dom";
import { HeaderBgPalms, Footer } from "../components";

function MainLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      <HeaderBgPalms />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default MainLayout;
