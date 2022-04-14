import React, { useState, useEffect } from "react";
import { PostItem } from "./PostItem";
import { DeletePost } from "./DeletePost";

export function DeletePostMenu({ props }) {
  const [posts, setPosts] = useState([]);
  const [id, setId] = useState(undefined);

  const [hasClicked, setHasClicked] = useState(false);

  useEffect(() => {
    async function fetchOwnPosts() {
      const response = await fetch("http://localhost:5500/dashboard/posts/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token")),
        },
      });
      if (!response.ok) return console.log(response.status);
      const data = await response.json();
      setPosts(data.data);
    }
    fetchOwnPosts();
  }, []);

  if (hasClicked) {
    return (
      <DeletePost
        post={posts.find(({ id: idPost }) => idPost === id)}
      />
    );
  }
  return (
    <div>
      <h2>Delete post</h2>
      <p>Select a post</p>
      {posts.map((post) => (
        <div className="post-item">
          <PostItem post={post}></PostItem>
          <button
            onClick={() => {
              setId(post.id);
              setHasClicked(true);
            }}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}
