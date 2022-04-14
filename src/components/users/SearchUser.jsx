import React, { useState, useEffect } from "react";
import { response } from "../../utils/response";
import { UserItem } from "./UserItem";

export function SearchUser({ props }) {
  const [user, setUser] = useState(undefined);
  const [id, setId] = useState(0);
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
    
    const {data, ok} = await response("http://localhost:5500/dashboard/users/" + id)
    

    if (!ok) return console.log(response.status);
 
    data.data === null ? setUser(undefined) : setUser(data.data);
  }

  return (
    <>
      <h2>Searching user by id</h2>
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
              <UserItem user={user}></UserItem>
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
