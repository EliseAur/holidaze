export default function Register() {
  return (
    <div className="w-full max-w-xs p-4 mx-auto">
      <h1 className="text-4xl font-black italic text-lightGreen text-shadow mb-2">
        Register
      </h1>
      <p className="font-bold text-md text-beige text-shadow mb-4 leading-tight ">
        To book venues and to become a host, please register your details below.
      </p>
      <form className="">
        <div className="grid grid-cols-1 gap-4 mb-4">
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
              placeholder="name@stud.noroff.no"
              // {...register("email")}
              className="px-2 py-1 border border-darkBeige bg-lightBeige rounded-sm shadow-custom-dark w-full focus:border-lightGreen focus:border-2 focus:ring-lightGreen focus:outline-none"
            />
            {/* <p className="text-red-600 text-sm">{errors.email?.message}</p> */}
          </div>
          <div>
            <label
              htmlFor="username"
              className="block text-sm text-beige text-shadow"
            >
              Username
            </label>
            <input
              id="username"
              type="text"
              placeholder="user_name"
              // {...register("email")}
              className="px-2 py-1 border border-darkBeige bg-lightBeige rounded-sm shadow-custom-dark w-full focus:border-lightGreen focus:border-2 focus:ring-lightGreen focus:outline-none"
            />
            {/* <p className="text-red-600 text-sm">{errors.username?.message}</p> */}
          </div>
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
              // value={password}
              // onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              // {...register("subject")}
              className="px-2 py-1 border border-darkBeige bg-lightBeige rounded-sm shadow-custom-dark w-full focus:border-lightGreen focus:border-2 focus:ring-lightGreen focus:outline-none"
            />
            {/* <p className="text-red-600 text-sm">{errors.subject?.message}</p> */}
          </div>
          <div>
            <label
              htmlFor="avatar"
              className="block text-sm text-beige text-shadow"
            >
              Profile image
            </label>
            <input
              id="avatar"
              type="url"
              placeholder="Must be a valid URL"
              // {...register("email")}
              className="px-2 py-1 border border-darkBeige bg-lightBeige rounded-sm shadow-custom-dark w-full focus:border-lightGreen focus:border-2 focus:ring-lightGreen focus:outline-none"
            />
            {/* <p className="text-red-600 text-sm">{errors.avatar?.message}</p> */}
          </div>
        </div>
        <button
          type="submit"
          className="bg-lightGreen text-black font-bold p-2 mt-4 w-full rounded-sm shadow-custom-dark hover:bg-darkGreen"
        >
          Register
        </button>
        <div className="mt-10 text-beige font-regular text-shadow">
          <p>Already a member?</p>
        </div>
        <div className="bg-black text-beige text-center font-bold p-2 w-full rounded-sm shadow-custom-dark hover:bg-beige hover:text-black transition duration-200">
          <a href="/register" className="">
            Login
          </a>
        </div>
      </form>
    </div>
  );
}
