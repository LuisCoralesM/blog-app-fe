import React from "react";
import { useNavigate } from "react-router-dom";

export function Home() {
  let navigate = useNavigate();
  return (
    <>
      <h2>Blog App - Luis Corales</h2>
      <div>
        <button
          onClick={() => {
            navigate("/dashboard/users");
          }}
        >
          Users
        </button>
        <button
          onClick={() => {
            navigate("/dashboard/profiles");
          }}
        >
          Profiles
        </button>
        <button
          onClick={() => {
            navigate("/dashboard/posts");
          }}
        >
          Posts
        </button>
      </div>
    </>
  );
}
