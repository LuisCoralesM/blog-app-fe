import React, { useState, useEffect } from "react";
import { URL_API } from "../../config";
import { setState } from "../../utils/hooks";
import { fetchApi } from "../../utils/response";

export default function Signup(props) {
  const [user, setUser] = useState({
    firstName: undefined,
    lastName: undefined,
    email: undefined,
    password: undefined,
    username: undefined,
  });

  const [hasRegistered, setHasRegistered] = useState(false);

  useEffect(() => {
    localStorage.getItem("token") === null
      ? setHasRegistered(false)
      : setHasRegistered(true);
  }, []);

  async function signupUser(e) {
    try {
      e.preventDefault();

      const response = await fetchApi(URL_API + "/auth/signup/", "POST", {
        first_name: user.firstName,
        last_name: user.lastName,
        username: user.username,
        email: user.email,
        password: user.password,
      });

      console.log(response);

      if (!response.ok) return console.log(response.status);

      setHasRegistered(true);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <h2>Register</h2>
      {!hasRegistered ? (
        <form onSubmit={signupUser}>
          <label>First name:</label>
          <br />
          <input
            type="text"
            name="firstName"
            placeholder="John"
            onChange={setState(setUser)}
          />
          <br />
          <label>Last name:</label>
          <br />
          <input
            type="text"
            name="lastName"
            placeholder="Doe..."
            onChange={setState(setUser)}
          />
          <br />
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
          <label>Email:</label>
          <br />
          <input
            type="text"
            name="email"
            placeholder="john@email.com"
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
            minlength="8"
            maxlength="12"
          />
          <br />
          <button type="submit">Register</button>
        </form>
      ) : (
        "Has registered!"
      )}
    </>
  );
}
