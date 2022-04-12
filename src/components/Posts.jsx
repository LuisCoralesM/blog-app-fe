import React from "react";
import { useNavigate } from "react-router-dom";

export function Posts() {
  let navigate = useNavigate();
  return (
    <>
      <h2>Posts menu</h2>
      <div>
        <button
          onClick={() => {
            navigate("/dashboard/posts/myposts");
          }}
        >
          My posts
        </button>
        <button
          onClick={() => {
            navigate("/dashboard/posts/list");
          }}
        >
          List posts
        </button>
        <button
          onClick={() => {
            navigate("/dashboard/posts/search");
          }}
        >
          Search post
        </button>
        <button
          onClick={() => {
            navigate("/dashboard/posts/edit");
          }}
        >
          Edit post
        </button>
        <button
          onClick={() => {
            navigate("/dashboard/posts/delete");
          }}
        >
          Delete post
        </button>
      </div>
    </>
  );
}
