import React from "react";
import MenuButtons from "../components/menu/MenuButtons";
import Title from "../components/menu/Title";

export default function Users() {
  const items = [
    { link: "/dashboard/profiles/myprofile", text: "My profile" },
    { link: "/dashboard/profiles/list", text: "List profiles" },
    { link: "/dashboard/profiles/search", text: "Search profile by id" },
    { link: "/dashboard/profiles/edit", text: "Edit profile" },
  ];
  return (
    <section>
      <Title props={{ title: "Profiles" }} />
      <MenuButtons props={{ items: items }}></MenuButtons>
    </section>
  );
}
