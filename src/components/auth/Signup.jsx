import React, { useState, useEffect } from "react";

export function Signup({ props }) {
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [username, setUsername] = useState();
  const [hasRegistered, setHasRegistered] = useState(false);

  async function signupUser(e) {
    e.preventDefault();
    const response = await fetch("http://localhost:5500/auth/signup/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        first_name: firstName,
        last_name: lastName,
        username: username,
        email: email,
        password: password,
      }),
    });
    if (!response.ok) return console.log(response.status);
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
            name="firstname"
            placeholder="John"
            onChange={(e) => setFirstName(e.target.value)}
          />
          <br />
          <label>Last name:</label>
          <br />
          <input
            type="text"
            name="lastname"
            placeholder="Doe..."
            onChange={(e) => setLastName(e.target.value)}
          />
          <br />
          <label>Username:</label>
          <br />
          <input
            type="text"
            name="username"
            placeholder="johndoe123"
            onChange={(e) => setUsername(e.target.value)}
          />
          <br />
          <label>Email:</label>
          <br />
          <input
            type="text"
            name="email"
            placeholder="john@email.com"
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />
          <label>Password:</label>
          <br />
          <input
            type="password"
            name="psw"
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          <button type="submit" onSubmit={() => setHasRegistered(true)}>
            Register
          </button>
        </form>
      ) : (
        "Has registered!"
      )}
    </>
  );
}
