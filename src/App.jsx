// import { useState } from "react";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
// import "./App.css";

function App() {
  // const [count, setCount] = useState(0);

  return (
    <div id="" className="">
      <div
        className="headerNavBox bg-cover bg-bottom
       bg-no-repeat bg-fixed h-screen relative"
      >
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <header className="text-beige font-bold w-full relative z-10">
          <div className="container mx-auto flex justify-between items-center p-3">
            <div>
              <a
                href="#"
                className="text-lg text-shadow font-black italic text-lightGreen hover:text-darkGreen text-2xl sm:text-3xl"
              >
                HoliDaze
              </a>
            </div>
            <nav className="hidden md:flex md:items-center -ml-16">
              <a
                href="#"
                className="text-shadow hover:border hover:border-beige rounded-sm px-3 py-1 x-3 underline decoration-2"
              >
                Home
              </a>
              <a
                href="#"
                className="text-shadow hover:border hover:border-beige rounded-sm px-3 py-1 mx-3"
              >
                All venues
              </a>
              <a
                href="#"
                className="text-shadow hover:border hover:border-beige rounded-sm px-3 py-1 mx-3"
              >
                Become a host
              </a>
            </nav>
            <div>Login</div>
          </div>
        </header>
        <hero className="text-beige relative z-10 text-center">
          <div className="py-20 px-4 sm:px-6 lg:px-8">
            <h1 className="text-shadow text-4xl sm:text-5xl lg:text-6xl font-black italic ">
              Find Your Perfect Getaway
            </h1>
            <div className="font-bold text-shadow mt-4 text-lg sm:text-xl lg:text-2xl max-w-2xl mx-auto">
              <p>Book unique stays in stunning destinations</p>
              <p>
                Or share your home with the world by register as a host and earn
                from your space.
              </p>
            </div>
            <div className="max-w-[300px] mx-auto">
              <a
                className="w-full mt-8 inline-block bg-lightGreen text-black font-bold px-6 py-2 rounded-sm text-lg hover:bg-darkGreen"
                href="/"
              >
                Latest venues
              </a>
              <div className="flex mt-4 w-full">
                <input
                  type="text"
                  placeholder="Search for venues..."
                  className="flex-grow w-full sm:w-auto py-2 px-3 rounded-l-sm focus:outline-none input-inner-shadow bg-zinc-800/50 bg-opacity-90 border border-beige border-2 text-beige placeholder-stone-400"
                  value=""
                />
                <button className="bg-beige text-black font-bold px-3 py-2 rounded-r-sm hover:bg-darkBeige">
                  Search
                </button>
              </div>
            </div>
          </div>
        </hero>
      </div>

      <main className="text-center">
        <h1 className="text-3xl">Venues</h1>
      </main>
      <footer>&copy;Noroff School - tutorial React + Vite</footer>
    </div>
  );
}

export default App;
