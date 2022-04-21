import React from "react";
import { useNavigate } from "react-router-dom";

export default function Posts() {
  let navigate = useNavigate();
  return (
    <>
      <h1 className="text-3xl">Post menu</h1>
      <div>
        <button onClick={() => navigate("/dashboard/posts/myposts")}>
          My posts
        </button>
        <button onClick={() => navigate("/dashboard/posts/create")}>
          Create post
        </button>
        <button onClick={() => navigate("/dashboard/posts/list")}>
          List posts
        </button>
        <button onClick={() => navigate("/dashboard/posts/search")}>
          Search post by user
        </button>
        <button onClick={() => navigate("/dashboard/posts/edit")}>
          Edit post
        </button>
        <button onClick={() => navigate("/dashboard/posts/delete")}>
          Delete post
        </button>
      </div>
    </>
  );
}
