import React, { useState, useEffect } from "react";

export function CreatePost({ props }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    localStorage.getItem("token") === null
      ? setIsLogged(false)
      : setIsLogged(true);
  }, []);

  async function createPost(e) {
    e.preventDefault();
    const response = await fetch("http://localhost:5500/dashboard/posts/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        Authorization: "Bearer " + JSON.parse(localStorage.getItem("token")),
      },
      body: JSON.stringify({
        title: title,
        content: content,
      }),
    });
    if (!response.ok) return console.log(response.status);
    setIsSubmitted(true);
  }

  return (
    <>
      <h2>Create new post</h2>
      {!isLogged ? (
        <p>Log in first!</p>
      ) : isSubmitted ? (
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
