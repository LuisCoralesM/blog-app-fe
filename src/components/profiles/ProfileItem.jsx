import React from "react";

export default function ProfileItem({ profile }) {
  return profile === undefined ? (
    <li>User not found</li>
  ) : (
    <li>
      {profile.id +
        " - " +
        profile.user.username +
        " - " +
        (profile.bio === "" ? "no bio" : profile.bio) +
        " - " +
        profile.posts.length}
    </li>
  );
}
