import React, { useState } from "react";
import { URL_API } from "../../config";
import { setState } from "../../utils/hooks";
import { fetchApi } from "../../utils/response";

export default function CreatePost(props) {
  const [newPost, setNewPost] = useState({
    title: undefined,
    content: undefined,
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  async function createPost(e) {
    e.preventDefault();

    // if (!title || !content) return;

    const response = await fetchApi(URL_API + "/dashboard/posts/", "POST", {
      title: newPost.title,
      content: newPost.content,
    });

    if (!response.ok) return console.log(response.data.status);

    setIsSubmitted(true);
  }

  return (
    <>
      <h2>Create new post</h2>
      {isSubmitted ? (
        <p>Post submitted</p>
      ) : (
        <form onSubmit={createPost}>
          <label>Title:</label>
          <br />
          <input
            type="text"
            name="title"
            placeholder="Title..."
            onChange={setState(setNewPost)}
            required
          />
          <br />
          <label>Content:</label>
          <br />
          <textarea
            rows="5"
            cols="60"
            type="text"
            name="content"
            placeholder="Content..."
            onChange={setState(setNewPost)}
            required
          />
          <br />
          <button type="submit">Submit</button>
        </form>
      )}
    </>
  );
}
