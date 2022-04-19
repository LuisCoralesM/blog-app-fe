import React, { useState } from "react";
import { URL_API } from "../../config";
import { fetchApi } from "../../utils/response";
import PostItem from "./PostItem";

export default function SearchPost(props) {
  const [posts, setPosts] = useState([]);
  const [username, setUsername] = useState("");
  const [hasSearched, setSearch] = useState(false);

  async function fetchPostsByUser(e) {
    e.preventDefault();
    setSearch(true);

    if (!username) return;

    const response = await fetchApi(
      URL_API + "/dashboard/posts/user/" + username
    );
    if (!response.ok) return console.log(response.data.status);

    setPosts(response.data.data);
  }

  return (
    <>
      <h2>Searching posts by username</h2>
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
  );
}
