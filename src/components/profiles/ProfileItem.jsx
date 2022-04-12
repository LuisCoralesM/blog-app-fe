import React from "react";

export function ProfileItem({ profile }) {
  return profile === undefined ? (
    <li>User not found</li>
  ) : (
    <li>
      {profile.id +
        " - " +
        (profile.deleted_at !== null ? "deleted" : "active") +
        " - " +
        profile.user.username +
        " - " +
        (profile.bio === "" ? "no bio" : profile.bio) +
        " - " +
        profile.posts.length}
    </li>
  );
}
