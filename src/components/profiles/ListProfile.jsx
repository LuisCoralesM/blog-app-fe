import React, { useState, useEffect } from "react";
import { ProfileItem } from "./ProfileItem";

export function ListProfile({ props }) {
  const [profiles, setProfiles] = useState([]);
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    localStorage.getItem("token") === null
      ? setIsLogged(false)
      : setIsLogged(true);
  }, []);

  useEffect(() => {
    async function fetchUser() {
      const response = await fetch(
        "http://localhost:5500/dashboard/profiles/all",
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
      setProfiles(data.data);
    }
    fetchUser();
  }, []);

  return (
    <>
      <h2>List all profiles</h2>

      {!isLogged ? (
        <p>Log in first!</p>
      ) : (
        <ul>
          {profiles.map((profile) => (
            <ProfileItem profile={profile}></ProfileItem>
          ))}
        </ul>
      )}
    </>
  );
}
