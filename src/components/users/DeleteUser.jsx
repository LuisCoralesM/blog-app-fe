import React, { useState, useEffect } from "react";
import { UserItem } from "./UserItem";

export function DeleteUser({ props }) {
  const [user, setUser] = useState(undefined);
  const [id, setId] = useState(0);
  const [isDeleted, setDeleted] = useState(false);

  // async function fetchUser() {
  //   const response = await fetch(
  //     "http://localhost:5500/dashboard/users/" + id,
  //     {
  //       method: "GET",
  //       headers: {
  //         "Content-Type": "application/json",
  //         "Access-Control-Allow-Origin": "*",
  //         Authorization:
  //           "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OSwiZmlyc3RfbmFtZSI6Ikx1aXMiLCJsYXN0X25hbWUiOiJBQSIsInVzZXJuYW1lIjoibHVpc2NvcmFsZXMxIiwiZW1haWwiOiJsdWlzQGVtYWlsMS5jb20iLCJwYXNzd29yZCI6IiRhcmdvbjJpZCR2PTE5JG09NDA5Nix0PTMscD0xJGo0QW5sakZkaTNDbnBXL0t4NUxQc3ckeTBVNk1RdlY0VlVLRjdJbGN3RE9PRzNaUERycGxUVVl1aGpxM2xkc3IyVSIsInByb2ZpbGVfaWQiOjgsImNyZWF0ZWRfYXQiOiIyMDIyLTA0LTExVDE0OjI1OjU3Ljk4MVoiLCJkZWxldGVkX2F0IjpudWxsLCJpYXQiOjE2NDk2ODcxODd9.Un1nLnbVnf1tidI3Ot048rwmE_2LmdMTLkm2bPLHhKk",
  //       },
  //     }
  //   );
  //   if (!response.ok) return console.log(response.status);
  //   setDeleted(true);
  //   const data = await response.json();
  //   data.data === null ? setUser(undefined) : setUser(data.data);
  // }

  async function deleteUser() {
    const response = await fetch("http://localhost:5500/dashboard/users/", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OSwiZmlyc3RfbmFtZSI6Ikx1aXMiLCJsYXN0X25hbWUiOiJBQSIsInVzZXJuYW1lIjoibHVpc2NvcmFsZXMxIiwiZW1haWwiOiJsdWlzQGVtYWlsMS5jb20iLCJwYXNzd29yZCI6IiRhcmdvbjJpZCR2PTE5JG09NDA5Nix0PTMscD0xJGo0QW5sakZkaTNDbnBXL0t4NUxQc3ckeTBVNk1RdlY0VlVLRjdJbGN3RE9PRzNaUERycGxUVVl1aGpxM2xkc3IyVSIsInByb2ZpbGVfaWQiOjgsImNyZWF0ZWRfYXQiOiIyMDIyLTA0LTExVDE0OjI1OjU3Ljk4MVoiLCJkZWxldGVkX2F0IjpudWxsLCJpYXQiOjE2NDk2ODcxODd9.Un1nLnbVnf1tidI3Ot048rwmE_2LmdMTLkm2bPLHhKk",
      },
    });
    const data = await response.json();
    setDeleted(true);

    console.log(data.data);
  }

  return isDeleted ? (
    <>
      <h2>Delete own user</h2>
      {/* <button onClick={fetchUser}>Search</button> */}
      <p>User deleted</p>
    </>
  ) : (
    <>
      <h2>Delete own user</h2>
      <p>Are you sure you want to delete your user?</p>
      {/* <UserItem user={user}></UserItem> */}
      <button onClick={deleteUser}>Confirm delete</button>
    </>
  );
}
