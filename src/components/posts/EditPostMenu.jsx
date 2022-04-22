import React, { useState, useEffect } from "react";
import PostItem from "./PostItem";
import EditPost from "./EditPost";
import { URL_API } from "../../config";
import { fetchApi } from "../../utils/response";

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
      <>
        <h2>Edit post</h2>
        <EditPost post={posts.find((post) => post.id === id)} />
      </>
    );
  }

  return (
    <>
      <h2>Edit post</h2>
      <p>Select a post</p>
      {posts.map((post) => (
        <div className="post-item">
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
    </>
  );
}
