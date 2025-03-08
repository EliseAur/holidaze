import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes, faUser } from "@fortawesome/free-solid-svg-icons";

export function Logo() {
  return (
    <div>
      <Link
        to="/"
        className="text-2xl text-shadow font-black italic text-lightGreen hover:text-darkGreen sm:text-3xl"
      >
        HoliDaze
      </Link>
    </div>
  );
}

export function LogoutAccountBtnWideScreen({ handleLogout }) {
  const location = useLocation();
  return (
    <>
      <button
        onClick={handleLogout}
        className="mr-2 text-sm rounded-full bg-zinc-800/50 py-1 px-4 border-beige border-1 text-beige shadow-custom-dark transition-all focus:bg-lightGreen focus:border-lightGreen focus:text-black hover:bg-lightGreen hover:text-black hover:border-lightGreen cursor-pointer"
      >
        Logout
      </button>
      <Link
        to="/account"
        className={`text-sm rounded-full py-1 px-1 border-beige border-1 text-beige shadow-custom-dark transition-all focus:bg-lightGreen focus:border-lightGreen focus:text-black hover:bg-lightGreen hover:text-black hover:border-lightGreen cursor-pointer ${location.pathname === "/account" ? "bg-lightGreen border-lightGreen text-black" : "bg-zinc-800/50"}`}
      >
        <FontAwesomeIcon icon={faUser} className="h-6 w-6" />
      </Link>
    </>
  );
}

export function LogoutAccountBtnMobile({ handleLogout }) {
  return (
    <div className="flex text-right px-4">
      <button
        onClick={handleLogout}
        className="mr-2 text-sm rounded-full py-1 px-4  bg-beige text-black shadow-custom-dark transition-all focus:bg-lightGreen hover:bg-lightGreen cursor-pointer"
      >
        Logout
      </button>
      <div
        className={`text-md h-[29.6px] w-[29.6px] rounded-full px-2 bg-beige text-black shadow-custom-dark  transition-all focus:bg-lightGreen hover:bg-lightGreen cursor-pointer `}
      >
        <Link to="/account" title="Account">
          <FontAwesomeIcon icon={faUser} />
        </Link>
      </div>
    </div>
  );
}

export function LoginRegWideScreen() {
  const location = useLocation();

  return (
    <>
      <Link
        to="/login"
        className={`mr-2 text-sm rounded-full py-1 px-5 border-beige border-1 transition-all focus:bg-lightGreen focus:border-lightGreen focus:text-black hover:bg-lightGreen hover:text-black hover:border-lightGreen ${location.pathname === "/login" ? "bg-lightGreen border-lightGreen text-black" : "bg-zinc-800/50"}`}
      >
        Login
      </Link>
      <Link
        to="/register"
        className={`text-sm rounded-full py-1 px-4 border-beige border-1 transition-all focus:bg-lightGreen focus:border-lightGreen focus:text-black hover:bg-lightGreen hover:text-black hover:border-lightGreen ${location.pathname === "/register" ? "bg-lightGreen border-lightGreen text-black" : "bg-zinc-800/50"}`}
      >
        Register
      </Link>
    </>
  );
}

export function LoginRegMobile() {
  return (
    <div className="flex mt-5">
      <Link
        to="/login"
        className="mr-2 text-sm rounded-full bg-beige py-1 px-5 text-black transition-all focus:bg-darkGreen  hover:bg-darkGreen"
      >
        Login
      </Link>
      <Link
        to="/register"
        className="text-sm rounded-full bg-beige text-black py-1 px-3 transition-all focus:bg-darkGreen  hover:bg-darkGreen "
      >
        Register
      </Link>
    </div>
  );
}
