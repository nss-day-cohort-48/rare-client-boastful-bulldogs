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

  return (
    <PostTagsContext.Provider
      value={{
        getTagsByPostId,
        postTags,
        getAllPostTags,
      }}
    >
      {props.children}
    </PostTagsContext.Provider>
  );
};
