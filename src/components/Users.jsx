import React from "react";
import { useNavigate } from "react-router-dom";

export function Users() {
  let navigate = useNavigate();
  return (
    <>
      <h2>Users menu</h2>
      <div>
        <button
          onClick={() =>  navigate("/dashboard/users/myuser")}
        >
          My user
        </button>
        <button
          onClick={() => {
            navigate("/dashboard/users/list");
          }}
        >
          List users
        </button>
        <button
          onClick={() => {
            navigate("/dashboard/users/search");
          }}
        >
          Search user by id
        </button>
        <button
          onClick={() => {
            navigate("/dashboard/users/edit");
          }}
        >
          Delete user
        </button>
      </div>
    </>
  );
}
