import React, { useState, useEffect } from "react";
import { UserItem } from "./UserItem";

export function DeleteUser({ props }) {
  const [user, setUser] = useState(undefined);
  const [isDeleted, setDeleted] = useState(false);

  useEffect(() => {
    // GET OWN USER DATA TO THEN DELETE
    async function fetchOwnUser() {
      const response = await fetch("http://localhost:5500/dashboard/users/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      if (!response.ok) return console.log(response.status);
      setDeleted(true);
      const data = await response.json();
      data.data === null ? setUser(undefined) : setUser(data.data);
    }
  }, []);

  async function deleteUser() {
    const response = await fetch("http://localhost:5500/dashboard/users/", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        Authorization: "Bearer " + JSON.parse(localStorage.getItem("token")),
      },
    });
    const data = await response.json();
    setDeleted(true);

    console.log(data.data);
  }

  return isDeleted ? (
    <>
      <h2>Delete own user</h2>
      <p>User deleted</p>
    </>
  ) : (
    <>
      <h2>Delete own user</h2>
      <p>Are you sure you want to delete your user?</p>
      <UserItem user={user}></UserItem>
      <button onClick={deleteUser}>Confirm delete</button>
    </>
  );
}
