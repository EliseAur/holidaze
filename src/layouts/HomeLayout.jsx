import { HeaderWithHero, Footer } from "../components";
// import { useState } from "react";
import { Outlet } from "react-router-dom";
import { useAuth } from "../context/useAuth";

function HomeLayout() {
  const { isLoggedIn, handleLogin, handleLogout } = useAuth();

  return (
    <div>
      <HeaderWithHero />
      <Outlet context={{ isLoggedIn, handleLogin, handleLogout }} />
      <Footer />
    </div>
  );
}

export default HomeLayout;
