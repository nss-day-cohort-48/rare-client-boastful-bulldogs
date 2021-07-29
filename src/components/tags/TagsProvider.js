import React, { useState, createContext } from "react";

export const TagsContext = createContext();

export const TagsProvider = (props) => {
  const [tags, setTags] = useState([]);
  const [tag, setTag] = useState({});

  const getAllTags = () => {
    return fetch("http://localhost:8088/tags")
      .then((res) => res.json())
      .then((data) => setTags(data)); // updates state with tags from server
  };

  const getTagById = (tag_id) => {
    return fetch(`http://localhost:8088/tags/${tag_id}`)
      .then((res) => res.json())
      .then(setTag);
  };

  const addTag = (tag) => {
    return fetch("http://localhost:8088/tags", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(tag),
    }).then(getAllTags);
  };

  return (
    <TagsContext.Provider
      value={{
        tags,
        getAllTags,
        getTagById,
        addTag,
      }}
    >
      {props.children}
    </TagsContext.Provider>
  );
};
