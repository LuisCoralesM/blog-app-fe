import React, { useState } from "react";
import { URL_API } from "../../config";
import { fetchApi } from "../../utils/response";
import Title from "../menu/Title";
import PostItem from "./PostItem";

export default function SearchPost(props) {
  const [posts, setPosts] = useState([]);
  const [username, setUsername] = useState("");
  const [notFound, setNotFound] = useState(false);
  const [hasSearched, setHasSearch] = useState(false);

  async function fetchPostsByUser(e) {
    e.preventDefault();
    setHasSearch(true);

    if (!username) return;

    const response = await fetchApi(
      URL_API + "/dashboard/posts/user/" + username
    );
    if (!response.ok) return console.log(response.data.status);

    if (response.data.data.length === 0) {
      return setNotFound(true);
    } else {
      setPosts(response.data.data);
      setNotFound(false);
    }
  }

  return (
    <section>
      <Title props={{ title: "Searching posts by username" }} />
      <form
        className="w-full max-w-sm mb-3 flex align-middle"
        onSubmit={fetchPostsByUser}
      >
        <input
          className="bg-gray-700 border-transparent rounded"
          type="text"
          placeholder="get by username"
          name="username"
          id="search-input"
          onChange={(e) => setUsername(e.target.value)}
        />
        <button
          className="flex-shrink-0 ml-1 border-transparent border-2 bg-gray-800 text-orange-500 hover:text-orange-700 text-sm p-2 rounded"
          type="submit"
        >
          Search
        </button>
      </form>
      {hasSearched
        ? notFound
          ? "User not found"
          : posts.map((post) => (
              <div className="post-item p-3 border-2 border-orange-600 rounded-lg flex gap-x-3 mb-1">
                <PostItem key={post?.id} post={post}></PostItem>
              </div>
            ))
        : ""}
    </section>
  );
}
