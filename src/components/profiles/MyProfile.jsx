import React, { useState, useEffect } from "react";
import { ProfileItem } from "./ProfileItem";

export function MyProfile({ props }) {
  const [profile, setProfile] = useState(undefined);
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

  return !isLogged ? (
    <>
      <h2>My profile</h2>
      <p>Log in first!</p>
    </>
  ) : (
    <>
      <h2>My profile</h2>
      <ProfileItem profile={profile}></ProfileItem>
    </>
  );
}
