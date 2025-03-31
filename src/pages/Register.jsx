import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SwitchField } from "../components";
import { authRegister } from "../api/authRegister";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  // const [avatarurl, setAvatarurl] = useState("");
  const [venueManager, setVenueManager] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const user = {
      name,
      email,
      password,
      // avatarurl,
      venueManager,
    };

    // Log the user object
    // console.log("User registration data:", user);

    try {
      const result = await authRegister(user);
      console.log("Registration response:", result);
      navigate("/login");
    } catch (error) {
      console.error("Error registering:", error);
    }
  };

  return (
    <div className="w-full max-w-xs p-4 mx-auto">
      <h1 className="text-4xl font-black italic text-lightGreen text-shadow mb-2">
        Register
      </h1>
      <p className="font-bold text-md text-beige text-shadow mb-4 leading-tight ">
        To book venues and to become a host, please register your details below.
      </p>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-4 mb-4">
          {/* Email input */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm text-beige text-shadow"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="px-2 py-1 border border-darkBeige bg-lightBeige rounded-sm shadow-custom-dark w-full focus:border-lightGreen focus:border-2 focus:ring-lightGreen focus:outline-none"
              placeholder="name@stud.noroff.no"
              required
            />
            {/* <p className="text-red-600 text-sm">{errors.email?.message}</p> */}
          </div>

          {/* Username input  */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm text-beige text-shadow"
            >
              Username
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="px-2 py-1 border border-darkBeige bg-lightBeige rounded-sm shadow-custom-dark w-full focus:border-lightGreen focus:border-2 focus:ring-lightGreen focus:outline-none"
              placeholder="user_name"
              required
            />
            {/* <p className="text-red-600 text-sm">{errors.username?.message}</p> */}
          </div>

          {/* Password input */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm text-beige text-shadow"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="px-2 py-1 border border-darkBeige bg-lightBeige rounded-sm shadow-custom-dark w-full focus:border-lightGreen focus:border-2 focus:ring-lightGreen focus:outline-none"
              placeholder="Enter password"
              required
            />
            {/* <p className="text-red-600 text-sm">{errors.subject?.message}</p> */}
          </div>

          {/* Avatar input */}
          {/* <div>
            <label
              htmlFor="avatar"
              className="block text-sm text-beige text-shadow"
            >
              Profile image
            </label>
            <input
              id="avatar"
              type="url"
              value={avatarurl}
              onChange={(e) => setAvatarurl(e.target.value)}
              className="px-2 py-1 border border-darkBeige bg-lightBeige rounded-sm shadow-custom-dark w-full focus:border-lightGreen focus:border-2 focus:ring-lightGreen focus:outline-none"
              placeholder="Must be a valid URL"
            />
          </div> */}

          {/* Venue Manager toggle */}
          <div className="text-sm">
            <label
              htmlFor="venueManager"
              className="block text-base text-beige font-bold text-shadow mb-1"
            >
              Register as a host?
            </label>
            <SwitchField
              label={
                venueManager ? "Yes, I want to register as a host" : "Not yet.."
              }
              checked={venueManager}
              onChange={setVenueManager}
              textColor="text-beige"
              textShadow="text-shadow"
            />
          </div>
        </div>
        <button
          type="submit"
          className="bg-lightGreen text-black font-bold p-2 mt-4 w-full rounded-sm shadow-custom-dark hover:bg-darkGreen cursor-pointer"
        >
          Register
        </button>
        <div className="mt-10 text-beige font-regular text-shadow">
          <p>Already a member?</p>
        </div>
        <Link
          to="/login"
          className="bg-black text-white text-center font-bold p-2 w-full rounded-sm shadow-custom-dark hover:bg-gray-900 transition duration-200 block cursor-pointer"
        >
          Login
        </Link>
      </form>
    </div>
  );
}
