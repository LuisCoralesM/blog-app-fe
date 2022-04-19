import React, { useState, useEffect } from "react";
import { URL_API } from "../../config";
import { setState } from "../../utils/hooks";
import { fetchApi } from "../../utils/response";
import ProfileItem from "./ProfileItem";

export default function SearchProfile(props) {
  const [profile, setProfile] = useState();
  const [id, setId] = useState();
  const [hasSearched, setSearch] = useState(false);

  async function fetchUser(e) {
    e.preventDefault();
    setSearch(true);

    if (!id) return;

    const response = await fetchApi(URL_API + "/dashboard/profiles/" + id);

    if (!response.ok) return console.log(response.data.status);

    response.data.data === null
      ? setProfile(undefined)
      : setProfile(response.data.data);
  }

  return (
    <>
      <h2>Searching profile by id</h2>
      {hasSearched ? (
        <>
          <form onSubmit={fetchUser}>
            <input
              type="text"
              placeholder="get by id"
              name="id"
              id="search-input"
              onChange={(e) => setId(e.target.value)}
            />
            <button type="submit">Search</button>
          </form>
          <ProfileItem profile={profile}></ProfileItem>
        </>
      ) : (
        <form onSubmit={fetchUser}>
          <input
            type="text"
            placeholder="get by id"
            name="id"
            id="search-input"
            onChange={(e) => setId(e.target.value)}
          />
          <button type="submit">Search</button>
        </form>
      )}
    </>
  );
}
