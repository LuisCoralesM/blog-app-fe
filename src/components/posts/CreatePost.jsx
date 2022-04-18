import React, { useState, useEffect } from "react";
import { URL_API } from "../../config";
import { fetchApi } from "../../utils/response";

export default function CreatePost(props) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  async function createPost(e) {
    e.preventDefault();

    const response = await fetchApi(URL_API + "/dashboard/posts/", "POST", {
      title: title,
      content: content,
    });

    if (!response.ok) return console.log(response.status);

    setIsSubmitted(true);
  }

  return (
    <>
      <h2>Create new post</h2>
      {isSubmitted ? (
        <p>Post submitted</p>
      ) : (
        <form onSubmit={(e) => createPost(e)}>
          <label>Title:</label>
          <br />
          <input
            type="text"
            name="title"
            placeholder="Title..."
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <br />
          <label>Content:</label>
          <br />
          <input
            type="text"
            name="content"
            placeholder="Content..."
            onChange={(e) => setContent(e.target.value)}
            required
          />
          <br />
          <button type="submit">Submit</button>
        </form>
      )}
    </>
  );
}
