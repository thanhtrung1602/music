import { useState, FormEvent } from "react";

import icon from "~/assets/img/icon";
import { fetchPost } from "~/Api";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { mutate } = fetchPost();

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const data = {
      email,
      password,
    };

    mutate({ url: "/auth/login", data });
  }

  return (
    <div className="mt-16 flex items-center justify-center">
      <form onSubmit={handleSubmit}>
        <div className="p-6">
          <div className="text-[16px]">
            <button className="mb-4 flex h-10 w-96 items-center justify-center rounded bg-[#3578e5] text-[#fff]">
              <img
                src={icon.facebook}
                className="mr-2 w-[15px]"
                alt="facebook"
              />
              Continue with Facebook
            </button>
            <button className="flex h-10 w-96 items-center justify-center rounded border border-solid border-[#ccc]">
              <img src={icon.google} className="mr-2 w-[15px]" alt="google" />
              Continue with Google
            </button>
          </div>
          <div className="my-4 flex items-center justify-center">
            <div className="h-[1px] w-[43%] border border-solid border-[#000]"></div>
            <span className="px-5">or</span>
            <div className="h-[1px] w-[43%] border border-solid border-[#000]"></div>
          </div>
          <div className="mb-4 flex flex-col">
            <label htmlFor="emailId" className="mb-1">
              email
            </label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="rounded-md border border-solid border-[#ccc] px-3 py-2 outline-none"
              type="text"
              name="email"
              id="emailId"
              placeholder="email"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="passwordId" className="mb-1">
              password
            </label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="rounded-md border border-solid border-[#ccc] px-3 py-2 outline-none"
              type="password"
              name="password"
              id="passwordId"
              placeholder="password"
            />
          </div>
        </div>
        <div className="flex items-center justify-center">
          <button
            type="submit"
            className="w-[384px] rounded bg-[#ff5500] px-3 py-2 text-[#fff]"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;
