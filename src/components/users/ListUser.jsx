import React, { useState, useEffect } from "react";
import { UserItem } from "./UserItem";

export function ListUsers({ props }) {
  const [users, setUsers] = useState([
    { id: 1, username: "Luis" },
    { id: 2, username: "Jose" },
  ]);

  useEffect(() => {
    async function fetchUsers() {
      const response = await fetch("http://localhost:5500/dashboard/users", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token")),
        },
      });
      if (!response.ok) return console.log(response.status);

      const data = await response.json();
      setUsers(data.data);
    }
    fetchUsers();
  }, []);

  return (
    <>
      <h2>List all users</h2>
      <ul>
        {users.map((user) => (
          <UserItem user={user}></UserItem>
        ))}
      </ul>
    </>
  );
}
