import React, { useState, useEffect } from "react";
import { URL_API } from "../../config";
import { fetchApi } from "../../utils/response";
import Title from "../menu/Title";
import PostItem from "./PostItem";

export default function MyPosts(props) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function fetchOwnPosts() {
      const response = await fetchApi(URL_API + "/dashboard/posts/");

      if (!response.ok) return console.log(response.data.status);

      setPosts(response.data.data);
    }
    fetchOwnPosts();
  }, []);

  return (
    <section>
      <Title props={{ title: "My posts" }} />
      {posts.map((post) => (
        <PostItem key={post?.id} post={post}></PostItem>
      ))}
    </section>
  );
}
