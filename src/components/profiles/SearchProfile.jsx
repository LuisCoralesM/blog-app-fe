import React, { useState } from "react";
import { URL_API } from "../../config";
import { fetchApi } from "../../utils/response";
import Title from "../menu/Title";
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

    setProfile(response.data.data ?? undefined);
  }

  return (
    <section>
      <Title props={{ title: "Searching profile by id" }} />
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
          <ProfileItem key={profile?.id} profile={profile}></ProfileItem>
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
    </section>
  );
}
