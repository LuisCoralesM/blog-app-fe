import React, { useState, useEffect } from "react";
import { UserItem } from "./UserItem";

export function DeleteUser({ props }) {
  const [user, setUser] = useState(undefined);
  const [isDeleted, setDeleted] = useState(false);
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    localStorage.getItem("token") === null
      ? setIsLogged(false)
      : setIsLogged(true);
  }, []);

  useEffect(() => {
    // GET OWN USER DATA TO THEN DELETE
    async function fetchOwnUser() {
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
      if (data.data.deleted_at !== null) setDeleted(true);
    }
    fetchOwnUser();
  }, []);

  async function deleteUser(e) {
    e.preventDefault();
    const response = await fetch("http://localhost:5500/dashboard/users/", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        Authorization: "Bearer " + JSON.parse(localStorage.getItem("token")),
      },
    });
    if (!response.ok) return console.log(response.status);
    setDeleted(true);
    localStorage.clear();
  }

  return !isLogged ? (
    <>
      <h2>Delete own user</h2>
      <p>Log in first!</p>
    </>
  ) : isDeleted ? (
    <>
      <h2>Delete own user</h2>
      <p>User deleted</p>
    </>
  ) : (
    <>
      <h2>Delete own user</h2>
      <p>Are you sure you want to delete your user?</p>
      <UserItem user={user}></UserItem>
      <form onSubmit={(e) => deleteUser(e)}>
        <button>Confirm delete</button>
      </form>
    </>
  );
}
