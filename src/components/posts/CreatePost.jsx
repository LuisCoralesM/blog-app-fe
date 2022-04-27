import React, { useState } from "react";
import { URL_API } from "../../config";
import { setState } from "../../utils/hooks";
import { fetchApi } from "../../utils/response";
import Title from "../menu/Title";

export default function CreatePost(props) {
  const [newPost, setNewPost] = useState({
    title: undefined,
    content: undefined,
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  async function createPost(e) {
    e.preventDefault();

    const response = await fetchApi(URL_API + "/dashboard/posts/", "POST", {
      title: newPost.title,
      content: newPost.content,
    });

    if (!response.ok) return console.log(response.data.status);

    setIsSubmitted(true);
  }

  return (
    <section>
      <Title props={{ title: "Create new post" }} />
      {isSubmitted ? (
        <p>Post submitted</p>
      ) : (
        <form className="w-full" onSubmit={createPost}>
          <input
            className="w-full bg-gray-700 border-transparent rounded"
            type="text"
            name="title"
            placeholder="Title..."
            onChange={setState(setNewPost)}
            required
          />
          <br />
          <br />
          <textarea
            className="w-full bg-gray-700 border-transparent rounded"
            rows="5"
            type="text"
            name="content"
            placeholder="Content..."
            onChange={setState(setNewPost)}
            required
          />
          <br />
          <button
            className="mt-3 flex-shrink-0 border-transparent border-2 bg-gray-800 text-orange-500 hover:text-orange-700 text-sm p-2 rounded"
            type="submit"
          >
            Submit
          </button>
        </form>
      )}
    </section>
  );
}
