import { Outlet } from "react-router-dom";
import { HeaderBgPalms, Footer } from "../components";
import { useAuth } from "../context/useAuth";

function MainLayout() {
  const { isLoggedIn, handleLogin, handleLogout } = useAuth();

  return (
    <div className="flex flex-col min-h-screen">
      <HeaderBgPalms />
      <main className="flex-grow">
        <Outlet context={{ isLoggedIn, handleLogin, handleLogout }} />
      </main>
      <Footer />
    </div>
  );
}

export default MainLayout;
