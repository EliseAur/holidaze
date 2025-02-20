import { Outlet } from "react-router-dom";
import { Header, FooterWithNoBg } from "../components";

export default function BgPalmsLayout() {
  return (
    <div
      className="headerNavBox bg-cover bg-bottom
         bg-no-repeat bg-fixed h-screen relative"
    >
      <div className="absolute inset-0 bg-black opacity-40"></div>
      <div className="relative z-10 flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow flex items-center justify-center w-full">
          <Outlet />
        </main>
        <FooterWithNoBg />
      </div>
    </div>
  );
}
