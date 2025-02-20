export default function Header() {
  return (
    <header className="text-beige font-bold w-full relative z-10">
      <div className="container mx-auto flex justify-between items-center p-3">
        <div>
          <a
            href="#"
            className="text-2xl text-shadow font-black italic text-lightGreen hover:text-darkGreen sm:text-3xl"
          >
            HoliDaze
          </a>
        </div>
        <nav className="hidden md:flex md:items-center space-x-3">
          <a
            href="#"
            className="text-shadow border border-transparent px-3 py-1 mx-3 flex-1 text-center hover:border hover:border-beige rounded-sm  underline decoration-2 whitespace-nowrap"
          >
            Home
          </a>
          <a
            href="#"
            className="text-shadow border border-transparent px-3 py-1 mx-3 flex-1 text-center hover:border hover:border-beige rounded-sm whitespace-nowrap"
          >
            All venues
          </a>
          <a
            href="#"
            className="text-shadow border border-transparent px-3 py-1 mx-3 flex-1 text-center hover:border hover:border-beige rounded-sm whitespace-nowrap"
          >
            Become a host
          </a>
        </nav>
        <div className="row flex">
          <a
            href="#"
            className="text-sm rounded-l-sm bg-zinc-800/50 py-1 px-3 border-beige border-2 text-beige transition-all focus:bg-lightGreen focus:border-darkGreen focus:text-black active:bg-lightgreen active:border-darkGreen active:text-black hover:bg-lightGreen hover:text-black hover:border-darkGreen"
          >
            Login
          </a>
          <a
            href="#"
            className="text-sm rounded-r-sm bg-beige text-black py-1 px-3 border-beige border-2 transition-all focus:bg-lightGreen focus:border-darkGreen focus:text-black active:bg-lightgreen active:border-darkGreen active:text-black hover:bg-lightGreen hover:text-black hover:border-darkGreen"
          >
            Register
          </a>
        </div>
      </div>
    </header>
  );
}
