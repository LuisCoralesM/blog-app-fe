import React, { useState } from "react";
import { URL_API } from "../../config";
import { fetchApi } from "../../utils/response";
import PostItem from "./PostItem";

export default function DeletePost({ post }) {
  const [isDeleted, setDeleted] = useState(false);

  async function deletePost(e) {
    e.preventDefault();

    const response = await fetchApi(
      URL_API + "/dashboard/posts/" + post.id,
      "DELETE"
    );

    if (!response.ok) return console.log(response.data.status);

    setDeleted(true);
  }

  return (
    <>
      {!isDeleted ? (
        <>
          <p>Are you sure you want to delete the post?</p>
          <PostItem key={post?.id} post={post}></PostItem>
          <form onSubmit={deletePost}>
            <button
              className="my-3 flex-shrink-0 border-transparent border-2 bg-gray-800 text-orange-500 hover:text-orange-700 text-sm p-2 rounded"
              type="submit"
            >
              Confirm delete
            </button>
          </form>
        </>
      ) : (
        <p className="mb-3">Post deleted</p>
      )}
    </>
  );
}
