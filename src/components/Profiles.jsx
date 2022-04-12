import React from "react";
import { useNavigate } from "react-router-dom";

export function Profiles() {
  let navigate = useNavigate();
  return (
    <>
      <h2>Profiles menu</h2>
      <div>
        <button
          onClick={() => {
            navigate("/dashboard/profiles/myprofile");
          }}
        >
          My profile
        </button>
        <button
          onClick={() => {
            navigate("/dashboard/profiles/list");
          }}
        >
          List profiles
        </button>
        <button
          onClick={() => {
            navigate("/dashboard/profiles/search");
          }}
        >
          Search profile by id
        </button>
        <button
          onClick={() => {
            navigate("/dashboard/profiles/edit");
          }}
        >
          Edit profile
        </button>
      </div>
    </>
  );
}
