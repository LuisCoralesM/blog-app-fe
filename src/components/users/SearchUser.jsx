import React, { useState, useEffect } from "react";
import { UserItem } from "./UserItem";

export function SearchUser({ props }) {
  const [user, setUser] = useState(undefined);
  const [id, setId] = useState(0);
  const [hasSearched, setSearch] = useState(false);

  function handleChange(e) {
    Number(e.target.value) ? setId(e.target.value) : setId(0);
  }

  async function fetchUser() {
    setSearch(true);
    const response = await fetch(
      "http://localhost:5500/dashboard/users/" + id,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token")),
        },
      }
    );
    if (!response.ok) return console.log(response.status);
    const data = await response.json();
    data.data === null ? setUser(undefined) : setUser(data.data);
  }

  return (
    <>
      <h2>Searching user by id</h2>
      {hasSearched ? (
        <>
          <input
            type="text"
            placeholder="get by id"
            name="id"
            id="search-input"
            onChange={(e) => handleChange(e)}
          />
          <button onClick={fetchUser}>Search</button>
          <UserItem user={user}></UserItem>
        </>
      ) : (
        <>
          <input
            type="text"
            placeholder="get by id"
            name="id"
            id="search-input"
            onChange={(e) => handleChange(e)}
          />
          <button onClick={fetchUser}>Search</button>
        </>
      )}
    </>
  );
}
