import React, { useState, useEffect } from "react";
import { URL_API } from "../../config";
import { fetchApi } from "../../utils/response";
import PostItem from "./PostItem";

export default function ListPosts(props) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function fetchPosts() {
      const response = await fetchApi(URL_API + "/dashboard/posts/all");

      if (!response.ok) return console.log(response.data.status);

      setPosts(response.data.data);
    }
    fetchPosts();
  }, []);

  return (
    <>
      <h2>List all posts</h2>
      <ul>
        {posts.map((post) => (
          <PostItem post={post}></PostItem>
        ))}
      </ul>
    </>
  );
}
