import Header from "./Header";
import Hero from "./Hero";

export default function HeaderWithHero() {
  return (
    <div
      className="headerNavBox bg-cover bg-bottom
         bg-no-repeat bg-fixed h-screen relative pb-2 pt-1"
    >
      <div className="absolute inset-0 bg-black opacity-40"></div>
      <Header />
      <Hero />
    </div>
  );
}
