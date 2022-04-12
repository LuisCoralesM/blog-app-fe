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
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OSwiZmlyc3RfbmFtZSI6Ikx1aXMiLCJsYXN0X25hbWUiOiJBQSIsInVzZXJuYW1lIjoibHVpc2NvcmFsZXMxIiwiZW1haWwiOiJsdWlzQGVtYWlsMS5jb20iLCJwYXNzd29yZCI6IiRhcmdvbjJpZCR2PTE5JG09NDA5Nix0PTMscD0xJGo0QW5sakZkaTNDbnBXL0t4NUxQc3ckeTBVNk1RdlY0VlVLRjdJbGN3RE9PRzNaUERycGxUVVl1aGpxM2xkc3IyVSIsInByb2ZpbGVfaWQiOjgsImNyZWF0ZWRfYXQiOiIyMDIyLTA0LTExVDE0OjI1OjU3Ljk4MVoiLCJkZWxldGVkX2F0IjpudWxsLCJpYXQiOjE2NDk2ODcxODd9.Un1nLnbVnf1tidI3Ot048rwmE_2LmdMTLkm2bPLHhKk",
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
