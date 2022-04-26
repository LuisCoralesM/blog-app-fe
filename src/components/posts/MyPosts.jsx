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
        <div className="post-item p-3 border-2 border-orange-600 rounded-lg flex gap-x-3 mb-1">
          <PostItem key={post?.id} post={post}></PostItem>
        </div>
      ))}
    </section>
  );
}
