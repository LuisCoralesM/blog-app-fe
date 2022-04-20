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
    console.log(response);

    localStorage.setItem("token", JSON.stringify(response.data.token));

    setHasLogged(true);
    props.setIsLogged(true);
  }

  return (
    <>
      <h2>Login</h2>
      {!hasLogged ? (
        <form onSubmit={loginUser}>
          <label>Username:</label>
          <br />
          <input
            type="text"
            name="username"
            placeholder="johndoe123"
            onChange={setState(setUser)}
            required
          />
          <br />
          <label>Password:</label>
          <br />
          <input
            type="password"
            name="password"
            onChange={setState(setUser)}
            required
          />
          <br />
          <button type="submit">Login</button>
        </form>
      ) : (
        "Has logged!"
      )}
    </>
  );
}
