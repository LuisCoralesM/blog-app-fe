import React, { useState, useEffect } from "react";
import PostItem from "./PostItem";
import EditPost from "./EditPost";
import { URL_API } from "../../config";
import { fetchApi } from "../../utils/response";
import Title from "../menu/Title";

export default function EditPostMenu(props) {
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
      <section>
        <Title props={{ title: "Edit post" }} />
        <EditPost post={posts.find((post) => post.id === id)} />
      </section>
    );
  }

  return (
    <section>
      <Title props={{ title: "Edit post" }} />
      <p className="mb-3">Select a post</p>
      {posts.map((post) => (
        <div className="post-item p-3 border-2 border-orange-600 rounded-lg flex gap-x-3">
          <PostItem key={post?.id} post={post}></PostItem>
          <button
            onClick={() => {
              setId(post.id);
              setHasClicked(true);
            }}
          >
            Edit
          </button>
        </div>
      ))}
    </section>
  );
}
