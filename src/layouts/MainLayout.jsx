import { Outlet } from "react-router-dom";
import { HeaderBgPalms, Footer } from "../components";
import { useAuth } from "../context/useAuth";

/**
 * MainLayout component provides a layout with a header, footer, and main content area.
 * It uses the authentication context to pass login state and functions to child components via the Outlet.
 *
 * @component
 * @returns {JSX.Element} The main layout component.
 *
 * @example
 * <MainLayout />
 */
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
