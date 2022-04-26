import React from "react";

export default function ProfileItem({ profile }) {
  return profile === undefined ? (
    <li className="list-none">User not found</li>
  ) : (
    <li className="list-none">
      {profile.user.username +
        " - " +
        (profile.bio === "" ? "no bio" : profile.bio) +
        " - " +
        profile.posts.length}
    </li>
  );
}
