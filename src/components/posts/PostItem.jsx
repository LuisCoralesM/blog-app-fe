import React from "react";

export function PostItem({ post }) {
  return post === undefined ? (
    <li>Post not found</li>
  ) : (
    <li>
      {post.id +
        " - " +
        post.profile.user.username +
        " - " +
        post.title +
        " - " +
        post.content +
        " - " +
        post.score +
        " - " +
        post.created_at}
    </li>
  );
}
