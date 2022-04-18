import React from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  let navigate = useNavigate();
  return (
    <>
      <h2>Blog App</h2>
      <div>
        <button onClick={() => navigate("/dashboard/users")}>Users</button>
        <button onClick={() => navigate("/dashboard/profiles")}>
          Profiles
        </button>
        <button onClick={() => navigate("/dashboard/posts")}>Posts</button>
      </div>
    </>
  );
}

export default Home;
