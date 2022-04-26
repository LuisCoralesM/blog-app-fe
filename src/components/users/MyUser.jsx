import React, { useState, useEffect } from "react";
import { URL_API } from "../../config";
import { fetchApi } from "../../utils/response";
import Title from "../menu/Title";
import UserItem from "./UserItem";

export default function MyUser(props) {
  const [user, setUser] = useState(undefined);

  useEffect(() => {
    async function fetchUser() {
      const response = await fetchApi(URL_API + "/dashboard/users/", "GET");

      if (!response.ok) return console.log(response.status);

      setUser(response.data.data ?? undefined);
    }
    fetchUser();
  }, []);

  return (
    <section>
      <Title props={{ title: "My user" }} />
      <UserItem key={user?.id} user={user}></UserItem>
    </section>
  );
}
