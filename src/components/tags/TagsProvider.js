import React, { useState, createContext } from "react";

export const TagsContext = createContext();

export const TagsProvider = (props) => {
  const [tags, setPosts] = useState([]);

  const getAllTags = () => {
    return fetch("http://localhost:8088/tags")
      .then((res) => res.json())
      .then((data) => setPosts(data)); // updates state with tags from server
  };

  const getTagById = (tag_id) => {
    return fetch(`http://localhost:8088/tags/${tag_id}`).then((res) =>
      res.json()
    );
  };

  return (
    <TagsContext.Provider
      value={{
        tags,
        getAllTags,
        getTagById,
      }}
    >
      {props.children}
    </TagsContext.Provider>
  );
};
