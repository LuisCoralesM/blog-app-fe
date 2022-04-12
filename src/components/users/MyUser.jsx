import React, { useState, useEffect } from "react";
import { UserItem } from "./UserItem";

export function MyUser({ props }) {
  const [user, setUser] = useState(undefined);
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    localStorage.getItem("token") === null
      ? setIsLogged(false)
      : setIsLogged(true);
  }, []);

  useEffect(() => {
    async function fetchUser() {
      const response = await fetch("http://localhost:5500/dashboard/users/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token")),
        },
      });
      if (!response.ok) return console.log(response.status);
      const data = await response.json();
      data.data === null ? setUser(undefined) : setUser(data.data);
    }
    fetchUser();
  }, []);

  return !isLogged ? (
    <>
      <h2>List all users</h2>
      <p>Log in first!</p>
    </>
  ) : (
    <>
      <h2>My User</h2>
      <UserItem user={user}></UserItem>
    </>
  );
}
