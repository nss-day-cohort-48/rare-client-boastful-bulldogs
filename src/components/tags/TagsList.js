import React, { useEffect, useContext } from "react";
import { TagsContext } from "./TagsProvider";
import "./Tags.css";
import { TagsForm } from "./TagsForm";
import { useHistory } from "react-router-dom";

export const TagsList = () => {
  const { tag, tags, getAllTags, deleteTag } = useContext(TagsContext);
  const history = useHistory();

  useEffect(() => {
    getAllTags();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const sortedTags = [...tags].sort((a, b) => {
    return a.label.localeCompare(b.label);
  });

  const handleDelete = (tagId) => {
    deleteTag(tagId).then(history.push("/tags"));
  };

  return (
    <>
      <h1>All Tags</h1>
      <br></br>
      <TagsForm />
      <br></br>
      {sortedTags.map((tag) => {
        return (
          <>
            <div>ID: {tag.id}</div>
            <div>Label: {tag.label}</div>
            <button onClick={() => history.push(`/tags/edit/${tag.id}`)}>
              Edit Tag
            </button>
            <button onClick={() => handleDelete(tag.id)}>Delete Tag</button>
          </>
        );
      })}
    </>
  );
};
