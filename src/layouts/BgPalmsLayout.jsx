import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Header, FooterWithNoBg } from "../components";

export default function BgPalmsLayout() {
  const location = useLocation();
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(true);
    const timer = setTimeout(() => setAnimate(false), 500); // Match the duration of the animation
    return () => clearTimeout(timer);
  }, [location]);

  return (
    <div
      className="headerNavBox bg-cover bg-bottom
         bg-no-repeat bg-fixed h-screen relative pb-2 pt-1"
    >
      <div className="absolute inset-0 bg-black opacity-40"></div>
      <div className="relative z-10 flex flex-col min-h-screen">
        <Header />
        <main
          className={`flex-grow flex items-center justify-center w-full ${animate ? "slide-up" : ""}`}
        >
          <Outlet />
        </main>
        <FooterWithNoBg />
      </div>
    </div>
  );
}
