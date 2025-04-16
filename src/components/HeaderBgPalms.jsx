import Header from "./Header";

export default function HeaderBgPalms() {
  return (
    <div
      className="headerNavBox bg-cover bg-bottom
         bg-no-repeat bg-fixed relative pb-2 pt-1"
    >
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <Header />
    </div>
  );
}
