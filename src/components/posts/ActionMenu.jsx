import React, { useState, useEffect } from "react";
import PostItem from "./PostItem";
import DeletePost from "./DeletePost";
import { fetchApi } from "../../utils/response";
import { URL_API } from "../../config";
import Title from "../menu/Title";
import EditPost from "./EditPost";

export default function ActionMenu(props) {
  const [posts, setPosts] = useState([]);
  const [id, setId] = useState();
  const [hasClickedDelete, setHasClickedDelete] = useState(false);
  const [hasClickedEdit, setHasClickedEdit] = useState(false);

  useEffect(() => {
    async function fetchOwnPosts() {
      const response = await fetchApi(URL_API + "/dashboard/posts/");

      if (!response.ok) return console.log(response.data.status);

      setPosts(response.data.data);
    }
    fetchOwnPosts();
  }, []);

  return (
    <section>
      <Title props={{ title: "Edit post" }} />
      {hasClickedEdit ? (
        <EditPost post={posts.find((post) => post.id === id)} />
      ) : (
        ""
      )}
      {hasClickedDelete ? (
        <DeletePost post={posts.find((post) => post.id === id)} />
      ) : (
        ""
      )}
      {!hasClickedDelete && !hasClickedEdit ? (
        <>
          {posts.map((post) => (
            <div className="post-item p-3 border-2 border-orange-600 rounded-lg flex gap-x-3 mb-1 items-center justify-between">
              <PostItem key={post?.id} post={post}></PostItem>
              <div className="flex gap-x-1">
                <button
                  className="flex-shrink-0 border-transparent border-2 bg-gray-800 text-orange-500 hover:text-orange-700 text-sm p-2 rounded"
                  onClick={() => {
                    setId(post.id);
                    setHasClickedEdit(true);
                    setHasClickedDelete(false);
                  }}
                >
                  Edit
                </button>
                <button
                  className="flex-shrink-0 border-transparent border-2 bg-gray-800 text-orange-500 hover:text-orange-700 text-sm p-2 rounded"
                  onClick={() => {
                    setId(post.id);
                    setHasClickedDelete(true);
                    setHasClickedEdit(false);
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </>
      ) : (
        ""
      )}
    </section>
  );
}
