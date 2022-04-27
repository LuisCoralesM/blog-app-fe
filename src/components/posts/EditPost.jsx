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
      {!isUpdated ? (
        <form className="w-full" onSubmit={updatePost}>
          <input
            className="w-full bg-gray-700 border-transparent rounded"
            type="text"
            name="title"
            id="title-input"
            defaultValue={post ? post.title : ""}
            onChange={setState(setEditedPost)}
          />
          <br />
          <br />
          <textarea
            className="w-full bg-gray-700 border-transparent rounded"
            rows="5"
            type="text"
            defaultValue={post ? post.content : ""}
            name="content"
            id="content-input"
            onChange={setState(setEditedPost)}
          />
          <br />
          <button
            className="my-3 flex-shrink-0 border-transparent border-2 bg-gray-800 text-orange-500 hover:text-orange-700 text-sm p-2 rounded"
            type="submit"
          >
            Update
          </button>
        </form>
      ) : (
        <p className="mb-3">Post updated!</p>
      )}
    </>
  );
}
