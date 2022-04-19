import React, { useState } from "react";
import { URL_API } from "../../config";
import { setState } from "../../utils/hooks";
import { fetchApi } from "../../utils/response";

export default function EditPost({ post }) {
  const [isUpdated, setIsUpdated] = useState(false);
  const [editedPost, setEditedPost] = useState({
    title: undefined,
    content: undefined,
  });

  async function updatePost(e) {
    e.preventDefault();

    const response = await fetchApi(
      URL_API + "/dashboard/posts/" + post.id,
      "PUT",
      {
        title: editedPost.title,
        content: editedPost.content,
      }
    );

    if (!response.ok) return console.log(response.data.status);

    setIsUpdated(true);
  }

  return (
    <>
      <p>Update title and content</p>
      {!isUpdated ? (
        <form onSubmit={updatePost}>
          <label>Title:</label>
          <br />
          <input
            type="text"
            name="title"
            id="title-input"
            defaultValue={post ? post.title : ""}
            onChange={setState(setEditedPost)}
          />
          <br />
          <label>Content:</label>
          <br />
          <textarea
            rows="5"
            cols="60"
            type="text"
            defaultValue={post ? post.content : ""}
            name="content"
            id="content-input"
            onChange={setState(setEditedPost)}
          />
          <br />
          <button type="submit">Update</button>
        </form>
      ) : (
        <p>Post updated!</p>
      )}
    </>
  );
}
