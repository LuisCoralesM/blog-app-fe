import React, { useState, useEffect } from "react";
import { PostItem } from "./PostItem";

export function SearchPost({ props }) {
  const [posts, setPosts] = useState([]);
  const [username, setUsername] = useState("");
  const [hasSearched, setSearch] = useState(false);

  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    localStorage.getItem("token") === null
      ? setIsLogged(false)
      : setIsLogged(true);
  }, []);

  async function fetchPostsByUser(e) {
    e.preventDefault();
    setSearch(true);
    const response = await fetch(
      "http://localhost:5500/dashboard/posts/user/" + username,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token")),
        },
      }
    );
    if (!response.ok) return console.log(response.status);
    const data = await response.json();
    console.log(data.data);
    setPosts(data.data);
  }

  return (
    <>
      <h2>Searching posts by username</h2>
      {!isLogged ? (
        <p>Log in first!</p>
      ) : (
        <>
          {hasSearched ? (
            <>
              <form onSubmit={(e) => fetchPostsByUser(e)}>
                <input
                  type="text"
                  placeholder="get by username"
                  name="username"
                  id="search-input"
                  onChange={(e) => setUsername(e.target.value)}
                />
                <button type="submit">Search</button>
              </form>
              {posts.map((post) => (
                <PostItem post={post}></PostItem>
              ))}
            </>
          ) : (
            <form onSubmit={(e) => fetchPostsByUser(e)}>
              <input
                type="text"
                placeholder="get by username"
                name="username"
                id="search-input"
                onChange={(e) => setUsername(e.target.value)}
              />
              <button type="submit">Search</button>
            </form>
          )}
        </>
      )}
    </>
  );
}
