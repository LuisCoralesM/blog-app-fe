import React, { useState, useEffect } from "react";
import { URL_API } from "../../config";
import { fetchApi } from "../../utils/response";
import Title from "../menu/Title";
import ProfileItem from "./ProfileItem";

export default function EditProfile(props) {
  const [profile, setProfile] = useState();
  const [bio, setBio] = useState();
  const [isUpdated, setIsUpdated] = useState(false);

  useEffect(() => {
    async function fetchOwnProfile() {
      const response = await fetchApi(URL_API + "/dashboard/profiles/");

      if (!response.ok) return console.log(response.data.status);

      setProfile(response.data.data ?? undefined);
    }
    fetchOwnProfile();
  }, []);

  async function updateProfile(e) {
    e.preventDefault();

    if (!bio) return;

    const response = await fetchApi(
      "http://localhost:5500/dashboard/profiles/",
      "PUT",
      { bio: bio }
    );
    if (!response.ok) return console.log(response.data.status);

    setIsUpdated(true);
  }

  return (
    <section>
      <Title props={{ title: "Update profile bio" }} />
      {isUpdated ? (
        <p>Profile updated</p>
      ) : (
        <>
          <p>Set new bio for your profile!</p>
          <ProfileItem key={profile?.id} profile={profile}></ProfileItem>
          <form onSubmit={updateProfile}>
            <input
              type="text"
              placeholder="bio..."
              name="bio"
              id="bio-input"
              onChange={(e) => setBio(e.target.value)}
            />
            <button type="submit">Update</button>
          </form>
        </>
      )}
    </section>
  );
}
