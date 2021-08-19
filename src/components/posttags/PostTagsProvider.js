import React, { useState, createContext } from "react";

export const PostTagsContext = createContext();

export const PostTagsProvider = (props) => {
  const [postTags, setPostTags] = useState([]);

  const getAllPostTags = () => {
    return fetch("http://localhost:8000/postTags", {
      headers: {
        Authorization: `Token ${localStorage.getItem("rare_user_id")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setPostTags(data));
  };

  const getTagsByPostId = (postId) => {
    return fetch(`http://localhost:8000/postTags?postId=${postId}`, {
      headers: {
        Authorization: `Token ${localStorage.getItem("rare_user_id")}`,
      },
    })
      .then((res) => res.json())
      .then(setPostTags);
  };

  const editPostTag = (postTag) => {
    return fetch(`http://localhost:8000/postTags/${postTag.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${localStorage.getItem("rare_user_id")}`,
      },
      body: JSON.stringify(postTag),
    });
  };

  const deletePostTag = (postTagId) => {
    return fetch(`http://localhost:8000/postTags/${postTagId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Token ${localStorage.getItem("rare_user_id")}`,
      },
    }).then(getAllPostTags);
  };

  const createPostTag = (newPostTagObj) => {
    return fetch(`http://localhost:8000/postTags`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${localStorage.getItem("rare_user_id")}`,
      },
      body: JSON.stringify(newPostTagObj),
    }).then(getAllPostTags);
  };

  return (
    <PostTagsContext.Provider
      value={{
        getTagsByPostId,
        postTags,
        getAllPostTags,
        editPostTag,
        deletePostTag,
        createPostTag,
      }}
    >
      {props.children}
    </PostTagsContext.Provider>
  );
};
