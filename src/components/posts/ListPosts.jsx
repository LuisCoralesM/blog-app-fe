import React, { useState, useEffect } from "react";
import { PostItem } from "./PostItem";

export function ListPosts({ props }) {
  const [posts, setPosts] = useState([]);
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    localStorage.getItem("token") === null
      ? setIsLogged(false)
      : setIsLogged(true);
  }, []);

  useEffect(() => {
    async function fetchPosts() {
      const response = await fetch(
        "http://localhost:5500/dashboard/posts/all",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            Authorization:
              "Bearer " + JSON.parse(localStorage.getItem("token")),
          },
        }
      );
      if (!response.ok) return console.log(response.status);
      const data = await response.json();
      setPosts(data.data);
    }
    fetchPosts();
  }, []);

  return (
    <>
      <h2>List all posts</h2>
      {!isLogged ? (
        <p>Log in first!</p>
      ) : (
        <ul>
          {posts.map((post) => (
            <PostItem post={post}></PostItem>
          ))}
        </ul>
      )}
    </>
  );
}
