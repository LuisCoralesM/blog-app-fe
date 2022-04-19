import React, { useState, useEffect } from "react";
import { URL_API } from "../../config";
import { fetchApi } from "../../utils/response";
import ProfileItem from "./ProfileItem";

export default function MyProfile(props) {
  const [profile, setProfile] = useState();

  useEffect(() => {
    async function fetchOwnProfile() {
      const response = await fetchApi(URL_API + "/dashboard/profiles/");

      if (!response.ok) return console.log(response.data.status);

      response.data === null
        ? setProfile(undefined)
        : setProfile(response.data.data);
    }
    fetchOwnProfile();
  }, []);

  return (
    <>
      <h2>My profile</h2>
      <ProfileItem profile={profile}></ProfileItem>
    </>
  );
}
