import React, { useState, useEffect } from "react";
import { URL_API } from "../../config";
import { fetchApi } from "../../utils/response";
import UserItem from "./UserItem";

export default function DeleteUser(props) {
  const [user, setUser] = useState();
  const [isDeleted, setDeleted] = useState(false);

  useEffect(() => {
    // GET OWN USER DATA TO THEN DELETE
    async function fetchOwnUser() {
      const response = await fetchApi(URL_API + "/dashboard/users/", "GET");

      if (!response.ok) return console.log(response.status);

      response.data.data === null
        ? setUser(undefined)
        : setUser(response.data.data);

      if (response.data.deleted_at != null) setDeleted(true);
    }
    fetchOwnUser();
  }, []);

  async function deleteUser(e) {
    e.preventDefault();
    const response = await fetchApi(URL_API + "/dashboard/users/", "DELETE");

    if (!response.ok) return console.log(response.data.status);

    setDeleted(true);
    localStorage.clear();
  }

  return (
    <section>
      <h2>Delete own user</h2>
      {isDeleted ? (
        <p>User deleted</p>
      ) : (
        <>
          <p>Are you sure you want to delete your user?</p>
          <UserItem key={user?.id} user={user}></UserItem>
          <form onSubmit={(e) => deleteUser(e)}>
            <button>Confirm delete</button>
          </form>
        </>
      )}
    </section>
  );
}
