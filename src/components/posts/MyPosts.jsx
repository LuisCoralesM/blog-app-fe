import React, { useState, useEffect } from "react";
import { PostItem } from "./PostItem";

export function MyPosts({ props }) {
  const [posts, setPosts] = useState([]);
  const [isLogged, setIsLogged] = useState(false);

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

  return (
    <>
      <h2>My posts</h2>
      {!isLogged ? (
        <p>Log in first!</p>
      ) : (
        posts.map((post) => <PostItem post={post}></PostItem>)
      )}
    </>
  );
}
