import React from "react";
import { UserItem } from "./UserItem";

export function ListUsers({ users }) {
  return (
    <ul>
      {users.map((user) => (
        <UserItem user={user}></UserItem>
      ))}
    </ul>
  );
}
