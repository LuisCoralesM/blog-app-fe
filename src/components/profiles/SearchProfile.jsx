import React, { useState } from "react";
import { URL_API } from "../../config";
import { fetchApi } from "../../utils/response";
import Title from "../menu/Title";
import ProfileItem from "./ProfileItem";

export default function SearchProfile(props) {
  const [profile, setProfile] = useState();
  const [id, setId] = useState();
  const [hasSearched, setSearch] = useState(false);

  async function fetchProfile(e) {
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
      <form
        className="w-full max-w-sm mb-3 flex align-middle"
        onSubmit={fetchProfile}
      >
        <input
          className="bg-gray-700 border-transparent rounded"
          type="text"
          placeholder="get by id"
          name="id"
          id="search-input"
          onChange={(e) => setId(e.target.value)}
        />
        <button
          className="flex-shrink-0 ml-1 border-transparent border-2 bg-gray-800 text-orange-500 hover:text-orange-700 text-sm p-2 rounded"
          type="submit"
        >
          Search
        </button>
      </form>
      {hasSearched ? (
        <ProfileItem key={profile?.id} profile={profile}></ProfileItem>
      ) : (
        ""
      )}
    </section>
  );
}
