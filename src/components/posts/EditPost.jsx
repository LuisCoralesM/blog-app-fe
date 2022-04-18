import React, { useState, useEffect } from "react";
import { URL_API } from "../../config";
import { fetchApi } from "../../utils/response";

export default function EditPost(props) {
  const [post, setPost] = useState(undefined);
  const [isUpdated, setIsUpdated] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [id, setId] = useState(0);

  useEffect(() => {
    setPost(props);
    setId(props.id);
  }, [props]);

  async function updatePost(e) {
    e.preventDefault();

    const response = await fetchApi(URL_API + "/dashboard/posts/" + id, "PUT", {
      title: title,
      content: content,
    });

    if (!response.ok) return console.log(response.status);

    setIsUpdated(true);
  }

  return (
    <>
      <p>Update title and content</p>
      {!isUpdated ? (
        <form onSubmit={(e) => updatePost(e)}>
          <label>Title:</label>
          <br />
          <input
            type="text"
            name="title"
            id="title-input"
            defaultValue={post ? post.title : ""}
            onChange={(e) => setTitle(e.target.value)}
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
            onChange={(e) => setContent(e.target.value)}
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
