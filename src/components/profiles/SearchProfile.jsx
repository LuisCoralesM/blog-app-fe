import React, { useState, useEffect } from "react";
import { ProfileItem } from "./ProfileItem";

export function SearchProfile({ props }) {
  const [profile, setProfile] = useState(undefined);
  const [id, setId] = useState();
  const [hasSearched, setSearch] = useState(false);

  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    localStorage.getItem("token") === null
      ? setIsLogged(false)
      : setIsLogged(true);
  }, []);

  function handleChange(e) {
    Number(e.target.value) ? setId(e.target.value) : setId(0);
  }

  async function fetchUser(e) {
    e.preventDefault();
    setSearch(true);
    if(!id) return
    const response = await fetch(
      "http://localhost:5500/dashboard/profiles/" + id,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token")),
        },
      }
    );
    if (!response.ok) return console.log(response.status);
    const data = await response.json();
    data.data === null ? setProfile(undefined) : setProfile(data.data);
  }

  return (
    <>
      <h2>Searching profile by id</h2>
      {!isLogged ? (
        <p>Log in first!</p>
      ) : (
        <>
          {hasSearched ? (
            <>
              <form onSubmit={(e) => fetchUser(e)}>
                <input
                  type="text"
                  placeholder="get by id"
                  name="id"
                  id="search-input"
                  onChange={(e) => handleChange(e)}
                />
                <button type="submit">Search</button>
              </form>
              <ProfileItem profile={profile}></ProfileItem>
            </>
          ) : (
            <form onSubmit={(e) => fetchUser(e)}>
              <input
                type="text"
                placeholder="get by id"
                name="id"
                id="search-input"
                onChange={(e) => handleChange(e)}
              />
              <button type="submit">Search</button>
            </form>
          )}
        </>
      )}
    </>
  );
}
