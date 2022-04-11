import React, { Fragment } from "react";
import { useNavigate } from "react-router-dom";

export function Users() {
  let navigate = useNavigate();
  return (
    <Fragment>
      <h2>Users menu</h2>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
        }}
      >
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
    </Fragment>
  );
}
