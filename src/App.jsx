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
       bg-no-repeat h-screen relative"
      >
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <header className="text-beige font-bold text-shadow w-full relative z-10">
          <div className="container mx-auto flex justify-between items-center p-4">
            <div className="text-lg font-bold">
              <a
                href="#"
                className="font-black italic hover:text-gray-200 text-2xl sm:text-3xl"
              >
                HoliDaze
              </a>
            </div>
            <nav className="space-x-4">
              <a href="#" className="hover:text-gray-200">
                Home
              </a>
              <a href="#" className="hover:text-gray-200">
                About
              </a>
              <a href="#" className="hover:text-gray-200">
                Contact
              </a>
              <a href="#" className="text-shadow hover:text-gray-200">
                Cart
              </a>
            </nav>
            <div>Login</div>
          </div>
        </header>
        <hero className="text-beige relative z-10 text-center">
          <div className="py-20 px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black italic text-shadow">
              Find Your Perfect Getaway
            </h1>
            <div className="font-bold mt-4 text-lg sm:text-xl lg:text-2xl max-w-2xl mx-auto text-shadow">
              <p>Book unique stays in stunning destinations</p>
              <p>
                Or share your home with the world by register as a host and earn
                from your space.
              </p>
            </div>
            <div className="max-w-[300px] mx-auto">
              <a
                className="mt-8 inline-block bg-lightGreen text-black font-bold px-6 py-3 rounded-md text-lg hover:bg-zinc-800 w-full"
                href="/"
              >
                Latest venues
              </a>
              <div>
                <input
                  type="text"
                  placeholder="Search for venues..."
                  className="w-full mt-4 py-3 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-zinc-900"
                  value=""
                ></input>
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
