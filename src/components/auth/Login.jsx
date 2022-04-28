import React, { useState, useEffect } from "react";
import { URL_API } from "../../config";
import { checkLogin } from "../../utils/checkLogin";
import { setState } from "../../utils/hooks";
import { fetchApi } from "../../utils/response";

export default function Login({ props }) {
  const [user, setUser] = useState({
    username: undefined,
    password: undefined,
  });
  const [hasLogged, setHasLogged] = useState(false);

  useEffect(() => {
    setHasLogged(checkLogin());
  }, []);

  async function loginUser(e) {
    e.preventDefault();

    const response = await fetchApi(URL_API + "/auth/login/", "POST", {
      username: user.username,
      password: user.password,
    });

    if (!response.ok) return console.log(response.data.status);

    localStorage.setItem("token", JSON.stringify(response.data.token));

    setHasLogged(true);
    props.setIsLogged(true);
  }

  return (
    <section className="mt-3">
      <div className="w-full flex justify-center">
        {!hasLogged ? (
          <form
            className="w-3/5 bg-gray-800 shadow-md rounded px-8 pt-6 pb-8 mb-4"
            onSubmit={loginUser}
          >
            <div className="mb-4">
              <label className="block text-sm mb-2" for="username">
                Username
              </label>
              <input
                className="bg-gray-700 shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                name="username"
                placeholder="johndoe123"
                onChange={setState(setUser)}
                required
              />
            </div>

            <div className="mb-3">
              <label className="block text-sm mb-2" for="password">
                Password
              </label>
              <input
                className="bg-gray-700 shadow appearance-none border rounded w-full py-2 px-3 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                type="password"
                name="password"
                onChange={setState(setUser)}
                required
              />
            </div>

            <button
              className="flex-shrink-0 border-transparent border-2 bg-gray-900 text-orange-500 hover:text-orange-700 text-sm p-2 rounded"
              type="submit"
            >
              Login
            </button>
          </form>
        ) : (
          <p className="font-bold">Has logged!</p>
        )}
      </div>
    </section>
  );
}
