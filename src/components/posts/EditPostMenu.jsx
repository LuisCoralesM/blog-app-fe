import React, { useState, useEffect } from "react";
import PostItem from "./PostItem";
import EditPost from "./EditPost";
import { URL_API } from "../../config";

export default function EditPostMenu(props) {
  const [posts, setPosts] = useState([]);
  const [post, setPost] = useState();
  const [hasClicked, setHasClicked] = useState(false);

  useEffect(() => {
    async function fetchOwnPosts() {
      const response = await fetch(URL_API + "/dashboard/posts/");

      if (!response.ok) return console.log(response.data.status);

      setPosts(response.data.data);
    }
    fetchOwnPosts();
  }, []);

  function getInfo(id) {
    setPost(posts.find((post) => post.id === id));
    setHasClicked(true);
  }

  return (
    <>
      <h2>Edit post</h2>
      {!hasClicked ? (
        <>
          <p>Select a post</p>
          {posts.map((post) => (
            <div className="post-item">
              <PostItem post={post}></PostItem>
              <button
                onClick={(e) => {
                  getInfo(post.id);
                }}
              >
                Edit
              </button>
            </div>
          ))}
        </>
      ) : (
        <EditPost props={post}></EditPost>
      )}
    </>
  );
}
