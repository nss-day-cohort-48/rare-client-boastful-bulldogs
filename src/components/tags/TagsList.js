import React, { useEffect, useContext } from "react";
import { TagsContext } from "./TagsProvider";
import "./Tags.css";
import { TagsForm } from "./TagsForm";

export const TagsList = () => {
  const { tags, getAllTags } = useContext(TagsContext);

  useEffect(() => {
    getAllTags();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const sortedTags = tags.sort((a, b) => {
    return a.label - b.label;
  });

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
            <button>Delete Tag</button>
          </>
        );
      })}
    </>
  );
};
