import React, { useState, Fragment, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function Home() {
  const [status, setStatus] = useState(0);

  // Get status of API
  useEffect(() => {
    async function fetchStatus() {
      const response = await fetch("http://localhost:5500/status", {
        method: "GET",
      });
      setStatus(response.status);
    }
    fetchStatus();
  }, [status]);

  let navigate = useNavigate();
  return (
    <Fragment>
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
    </Fragment>
  );
}
