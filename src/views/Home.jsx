import React from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  let navigate = useNavigate();
  return (
    <>
      <h1 className="text-3xl">Blog App</h1>
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
