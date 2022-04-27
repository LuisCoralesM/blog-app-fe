import React from "react";

export default function PostItem({ post }) {
  return post === undefined || post.length === 0 ? (
    <li className="list-none">Post not found</li>
  ) : (
    <li className="list-none">
      {post.profile.user.username +
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
