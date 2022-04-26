import React, { useState, useEffect } from "react";
import PostItem from "./PostItem";
import DeletePost from "./DeletePost";
import { fetchApi } from "../../utils/response";
import { URL_API } from "../../config";
import Title from "../menu/Title";

export default function DeletePostMenu(props) {
  const [posts, setPosts] = useState([]);
  const [id, setId] = useState();
  const [hasClicked, setHasClicked] = useState(false);

  useEffect(() => {
    async function fetchOwnPosts() {
      const response = await fetchApi(URL_API + "/dashboard/posts/");

      if (!response.ok) return console.log(response.data.status);

      setPosts(response.data.data);
    }
    fetchOwnPosts();
  }, []);

  if (hasClicked) {
    return (
      <>
        <h2>Delete post</h2>
        <DeletePost post={posts.find((post) => post.id === id)} />
      </>
    );
  }

  return (
    <section>
      <Title props={{ title: "Delete post" }} />
      <p className="mb-3">Select a post</p>
      {posts.map((post) => (
        <div className="post-item p-3 border-2 border-orange-600 rounded-lg flex gap-x-3 mb-1">
          <PostItem key={post?.id} post={post}></PostItem>
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
    </section>
  );
}
