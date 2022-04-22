import React, { useState } from "react";
import { URL_API } from "../../config";
import { fetchApi } from "../../utils/response";
import UserItem from "./UserItem";

export default function SearchUser(props) {
  const [user, setUser] = useState();
  const [id, setId] = useState(0);
  const [hasSearched, setSearch] = useState(false);

  async function fetchUser(e) {
    e.preventDefault();
    setSearch(true);

    const response = await fetchApi(URL_API + "/dashboard/users/" + id);
    if (!response.ok) return console.log(response.data.status);

    setUser(response.data.data ?? undefined);
  }

  return (
    <section>
      <h2>Searching user by id</h2>
      {hasSearched ? (
        <>
          <form onSubmit={fetchUser}>
            <input
              type="text"
              placeholder="get by id"
              name="id"
              id="search-input"
              onChange={(e) =>
                setId(Number(e.target.value) ? e.target.value : 0)
              }
            />
            <button type="submit">Search</button>
          </form>
          <UserItem user={user}></UserItem>
        </>
      ) : (
        <form onSubmit={fetchUser}>
          <input
            type="text"
            placeholder="get by id"
            name="id"
            id="search-input"
            onChange={(e) => setId(Number(e.target.value) ? e.target.value : 0)}
          />
          <button type="submit">Search</button>
        </form>
      )}
    </section>
  );
}
