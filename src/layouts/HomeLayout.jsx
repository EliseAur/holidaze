import { HeaderWithHero, Footer } from "../components";
import { Outlet } from "react-router-dom";

function HomeLayout() {
  return (
    <div>
      <HeaderWithHero />
      <Outlet />
      <Footer />
    </div>
  );
}

export default HomeLayout;
