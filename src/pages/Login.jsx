export default function Login() {
  return (
    <div className="w-full max-w-md p-4 mx-auto">
      <h1 className="text-3xl font-black italic text-lightGreen text-shadow mb-4">
        Login
      </h1>
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
              className="p-2 border border-darkBeige bg-lightBeige rounded-sm shadow-custom-dark w-full focus:border-lightGreen focus:border-2 focus:ring-lightGreen focus:outline-none"
            />
            {/* <p className="text-red-600 text-sm">{errors.email?.message}</p> */}
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
              className="p-2 border border-darkBeige bg-lightBeige rounded-sm shadow-custom-dark w-full focus:border-lightGreen focus:border-2 focus:ring-lightGreen focus:outline-none"
            />
            {/* <p className="text-red-600 text-sm">{errors.subject?.message}</p> */}
          </div>
        </div>
        <button
          type="submit"
          className="bg-lightGreen text-black font-bold p-2 mt-4 w-full rounded-sm shadow-custom-dark hover:bg-darkGreen"
        >
          Login
        </button>
        <div className="mt-10 text-beige font-regular text-shadow">
          <p>Not a member yet?</p>
        </div>
        <div className="bg-black text-beige text-center font-bold p-2 w-full rounded-sm shadow-custom-dark hover:bg-beige hover:text-black transition duration-200">
          <a href="/register" className="">
            Register
          </a>
        </div>
      </form>
    </div>
  );
}
