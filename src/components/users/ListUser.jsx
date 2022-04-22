import React, { useState, useEffect } from "react";
import { URL_API } from "../../config";
import { fetchApi } from "../../utils/response";
import UserItem from "./UserItem";

export default function ListUsers(props) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchUser() {
      const response = await fetchApi(URL_API + "/dashboard/users/all");

      if (!response.ok) return console.log(response.status);

      setUsers(response.data.data);
    }
    fetchUser();
  }, []);

  return (
    <section>
      <h2>List all users</h2>
      <ul>
        {users.map((user) => (
          <UserItem key={user?.id} user={user}></UserItem>
        ))}
      </ul>
    </section>
  );
}
