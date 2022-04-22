import React from "react";
import MenuButtons from "../components/menu/MenuButtons";
import Title from "../components/menu/Title";

export default function Posts() {
  const items = [
    { link: "/dashboard/posts/myposts", text: "My posts" },
    { link: "/dashboard/posts/create", text: "Create post" },
    { link: "/dashboard/posts/list", text: "List posts" },
    { link: "/dashboard/posts/search", text: "Search post by user" },
    { link: "/dashboard/posts/edit", text: "Edit post" },
    { link: "/dashboard/posts/delete", text: "Delete post" },
  ];
  return (
    <section>
      <Title props={{ title: "Posts" }} />
      <MenuButtons props={{ items: items }}></MenuButtons>
    </section>
  );
}
