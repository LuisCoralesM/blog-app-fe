import React from "react";

export function UserItem({ user }) {
  const { id, username } = user;
  return <li>{id + " - " + username}</li>;
}
