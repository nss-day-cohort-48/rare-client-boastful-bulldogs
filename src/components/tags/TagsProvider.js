import React, { useState, createContext } from "react";

export const TagsContext = createContext();

export const TagsProvider = (props) => {
  const [tags, setTags] = useState([]);
  const [tag, setTag] = useState({});

  const getAllTags = () => {
    return fetch("http://localhost:8000/tags")
      .then((res) => res.json())
      .then((data) => setTags(data)); // updates state with tags from server
  };

  const getTagById = (tag_id) => {
    return fetch(`http://localhost:8000/tags/${tag_id}`)
      .then((res) => res.json())
      .then(setTag);
  };

  const addTag = (tag) => {
    return fetch("http://localhost:8000/tags", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(tag),
    }).then(getAllTags);
  };

  const deleteTag = (tagId) => {
    return fetch(`http://localhost:8000/tags/${tagId}`, {
      method: "DELETE",
    }).then(getAllTags);
  };

  return (
    <TagsContext.Provider
      value={{
        tag,
        tags,
        getAllTags,
        getTagById,
        addTag,
        deleteTag,
      }}
    >
      {props.children}
    </TagsContext.Provider>
  );
};
