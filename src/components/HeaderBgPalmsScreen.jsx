import Header from "./Header";

export default function HeaderBgPalmsScreen() {
  return (
    <div
      className="headerNavBox bg-cover bg-bottom
         bg-no-repeat bg-fixed h-screen relative"
    >
      <div className="absolute inset-0 bg-black opacity-40"></div>
      <Header />
    </div>
  );
}
