import React, { useState, useEffect } from "react";
import { URL_API } from "../../config";
import { fetchApi } from "../../utils/response";
import Title from "../menu/Title";
import ProfileItem from "./ProfileItem";

export default function MyProfile(props) {
  const [profile, setProfile] = useState();

  useEffect(() => {
    async function fetchOwnProfile() {
      const response = await fetchApi(URL_API + "/dashboard/profiles/");

      if (!response.ok) return console.log(response.data.status);

      setProfile(response.data.data ?? undefined);
    }
    fetchOwnProfile();
  }, []);

  return (
    <section>
      <Title props={{ title: "My profile" }} />
      <ProfileItem key={profile?.id} profile={profile}></ProfileItem>
    </section>
  );
}
