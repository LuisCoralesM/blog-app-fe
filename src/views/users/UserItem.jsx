import React from "react";

export function UserItem({ user }) {
  return user === undefined ? (
    <p>User not found</p>
  ) : (
    <p>
      {user.id +
        " - " +
        user.username +
        " - " +
        user.first_name +
        " - " +
        user.last_name +
        " - " +
        user.email}
    </p>
  );
}
