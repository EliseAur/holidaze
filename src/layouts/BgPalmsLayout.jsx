import { Outlet } from "react-router-dom";
import { Header, FooterWithNoBg } from "../components";
import { useAuth } from "../context/useAuth";

export default function BgPalmsLayout() {
  const { isLoggedIn, handleLogin, handleLogout } = useAuth();

  return (
    <div
      className="headerNavBox bg-cover bg-bottom
         bg-no-repeat bg-fixed h-full relative"
    >
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative z-10 flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow flex items-center justify-center w-full">
          <Outlet context={{ isLoggedIn, handleLogin, handleLogout }} />
        </main>
        <footer className="p-5 pb-2">
          <FooterWithNoBg />
        </footer>
      </div>
    </div>
  );
}
