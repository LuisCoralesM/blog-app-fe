import React, { useState, useEffect } from "react";
import { URL_API } from "../../config";
import { fetchApi } from "../../utils/response";
import Title from "../menu/Title";
import ProfileItem from "./ProfileItem";

export default function ListProfile(props) {
  const [profiles, setProfiles] = useState([]);

  useEffect(() => {
    async function fetchUser() {
      const response = await fetchApi(URL_API + "/dashboard/profiles/all");

      if (!response.ok) return console.log(response.data.status);

      setProfiles(response.data.data);
    }
    fetchUser();
  }, []);

  return (
    <section>
      <Title props={{ title: "List all profiles" }} />
      <ul>
        {profiles.map((profile) => (
          <ProfileItem key={profile?.id} profile={profile}></ProfileItem>
        ))}
      </ul>
    </section>
  );
}
