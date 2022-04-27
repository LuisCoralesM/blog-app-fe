import React from "react";
import MenuButtons from "../components/menu/MenuButtons";
import Title from "../components/menu/Title";

export default function Home() {
  const items = [
    { link: "/dashboard/users", text: "Users" },
    { link: "/dashboard/profiles", text: "Profiles" },
    { link: "/dashboard/posts", text: "Posts" },
  ];
  return (
    <section>
      <Title props={{ title: "My Blog" }} />
      <MenuButtons props={{ items: items }}></MenuButtons>
    </section>
  );
}
