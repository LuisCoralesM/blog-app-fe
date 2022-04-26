import React from "react";

export default function UserItem({ user }) {
  return user === undefined ? (
    <li className="list-none">User not found</li>
  ) : (
    <li className="list-none">
      {user.username +
        " - " +
        user.first_name +
        " - " +
        user.last_name +
        " - " +
        user.email +
        " - " +
        (user.deleted_at != null ? "deleted" : "active")}
    </li>
  );
}
