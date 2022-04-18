import React, { useState, useEffect } from "react";
import { URL_API } from "../../config";
import { setState } from "../../utils/hooks";
import { fetchApi } from "../../utils/response";
import ProfileItem from "./ProfileItem";

export default function EditProfile(props) {
  const [profile, setProfile] = useState();
  const [bio, setBio] = useState("");
  const [isUpdated, setIsUpdated] = useState(false);

  useEffect(() => {
    async function fetchOwnProfile() {
      const response = await fetchApi(URL_API + "/dashboard/profiles/");

      if (!response.ok) return console.log(response.status);

      response.data === null
        ? setProfile(undefined)
        : setProfile(response.data);
    }
    fetchOwnProfile();
  }, []);

  async function updateProfile(e) {
    e.preventDefault();
    const response = await fetchApi(
      "http://localhost:5500/dashboard/profiles/",
      "PUT",
      { bio: bio }
    );
    if (!response.ok) return console.log(response.status);

    setIsUpdated(true);
  }

  return (
    <>
      <h2>Update profile bio</h2>
      {isUpdated ? (
        <p>Profile updated</p>
      ) : (
        <>
          <p>Set new bio for your profile!</p>
          <ProfileItem profile={profile}></ProfileItem>
          <form onSubmit={updateProfile}>
            <input
              type="text"
              placeholder="bio..."
              name="bio"
              id="bio-input"
              onChange={setState(setBio)}
            />
            <button type="submit">Update</button>
          </form>
        </>
      )}
    </>
  );
}
