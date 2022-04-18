import React, { useState } from "react";
import { URL_API } from "../../config";
import { setState } from "../../utils/hooks";
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

    if (!response.ok) return console.log(response.status);

    response.data === null ? setUser(undefined) : setUser(response.data);
  }

  return (
    <>
      <h2>Searching user by id</h2>
      {hasSearched ? (
        <>
          <form onSubmit={fetchUser}>
            <input
              type="text"
              placeholder="get by id"
              name="id"
              id="search-input"
              onChange={setState(setId)}
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
            onChange={setState(setId)}
          />
          <button type="submit">Search</button>
        </form>
      )}
    </>
  );
}
