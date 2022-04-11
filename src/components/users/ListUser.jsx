import React, { useState, Fragment, useEffect } from "react";
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
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OSwiZmlyc3RfbmFtZSI6Ikx1aXMiLCJsYXN0X25hbWUiOiJBQSIsInVzZXJuYW1lIjoibHVpc2NvcmFsZXMxIiwiZW1haWwiOiJsdWlzQGVtYWlsMS5jb20iLCJwYXNzd29yZCI6IiRhcmdvbjJpZCR2PTE5JG09NDA5Nix0PTMscD0xJGo0QW5sakZkaTNDbnBXL0t4NUxQc3ckeTBVNk1RdlY0VlVLRjdJbGN3RE9PRzNaUERycGxUVVl1aGpxM2xkc3IyVSIsInByb2ZpbGVfaWQiOjgsImNyZWF0ZWRfYXQiOiIyMDIyLTA0LTExVDE0OjI1OjU3Ljk4MVoiLCJkZWxldGVkX2F0IjpudWxsLCJpYXQiOjE2NDk2ODcxODd9.Un1nLnbVnf1tidI3Ot048rwmE_2LmdMTLkm2bPLHhKk",
        },
      });
      if (!response.ok) return console.log(response.status);

      const data = await response.json();
      setUsers(data.data);
    }
    fetchUsers();
  }, []);

  return (
    <Fragment>
      <h2>List all users</h2>
      <ul>
        {users.map((user) => (
          <UserItem user={user}></UserItem>
        ))}
      </ul>
    </Fragment>
  );
}
