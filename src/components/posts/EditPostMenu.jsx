import React, { useState, useEffect } from "react";
import { PostItem } from "./PostItem";
import { EditPost } from "./EditPost";

export function EditPostMenu({ props }) {
  const [posts, setPosts] = useState([]);
  const [post, setPost] = useState(undefined);
  const [isLogged, setIsLogged] = useState(false);
  const [hasClicked, setHasClicked] = useState(false);

  useEffect(() => {
    localStorage.getItem("token") === null
      ? setIsLogged(false)
      : setIsLogged(true);
  }, []);

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

  function getInfo(e) {
    setPost(
      posts.filter(
        (post) =>
          post.id ===
          Number(e.target.parentElement.children[0].innerText.split(" ")[0])
      )[0]
    );
    setHasClicked(true);
  }

  return (
    <>
      <h2>Edit post</h2>
      {!isLogged ? (
        <p>Log in first!</p>
      ) : !hasClicked ? (
        <>
          <p>Select a post</p>
          {posts.map((post) => (
            <div className="post-item">
              <PostItem post={post}></PostItem>
              <button
                onClick={(e) => {
                  getInfo(e);
                }}
              >
                Edit
              </button>
            </div>
          ))}
        </>
      ) : (
        <EditPost props={post}></EditPost>
      )}
    </>
  );
}
