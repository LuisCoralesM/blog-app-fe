import React, { useState, useEffect } from "react";
import { ProfileItem } from "./ProfileItem";

export function EditProfile({ props }) {
  const [profile, setProfile] = useState(undefined);
  const [bio, setBio] = useState("");
  const [isUpdated, setIsUpdated] = useState(false);
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    localStorage.getItem("token") === null
      ? setIsLogged(false)
      : setIsLogged(true);
  }, []);

  useEffect(() => {
    async function fetchOwnProfile() {
      const response = await fetch(
        "http://localhost:5500/dashboard/profiles/",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            Authorization:
              "Bearer " + JSON.parse(localStorage.getItem("token")),
          },
        }
      );
      if (!response.ok) return console.log(response.status);
      const data = await response.json();
      data.data === null ? setProfile(undefined) : setProfile(data.data);
    }
    fetchOwnProfile();
  }, []);

  function handleChange(e) {
    e.target.value ? setBio(e.target.value) : setBio("");
  }

  async function updateProfile(e) {
    e.preventDefault();
    const response = await fetch("http://localhost:5500/dashboard/profiles/", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        Authorization: "Bearer " + JSON.parse(localStorage.getItem("token")),
      },
      body: JSON.stringify({
        bio: bio,
      }),
    });
    if (!response.ok) return console.log(response.status);
    setIsUpdated(true);
  }

  return (
    <>
      <h2>Update profile bio</h2>
      {!isLogged ? (
        <p>Log in first!</p>
      ) : isUpdated ? (
        <p>Profile updated</p>
      ) : (
        <>
          <p>Set new bio for your profile!</p>
          <ProfileItem profile={profile}></ProfileItem>
          <form onSubmit={(e) => updateProfile(e)}>
            <input
              type="text"
              placeholder="bio..."
              name="bio"
              id="bio-input"
              onChange={(e) => handleChange(e)}
            />
            <button type="submit">Update</button>
          </form>
        </>
      )}
    </>
  );
}
