import React, { useEffect, useContext } from "react";
import { TagsContext } from "./TagsProvider";
import "./Tags.css";

export const TagsList = () => {
  const { tags, getAllTags } = useContext(TagsContext);

  useEffect(() => {
    getAllTags();
  }, []);

  const sortedTags = tags.sort((a, b) => {
    return a.label - b.label;
  });

  return (
    <>
      <h1>All Tags</h1>

      {sortedTags.map((tag) => {
        return (
          <>
            <div>ID: {tag.id}</div>
            <div>Label: {tag.label}</div>
          </>
        );
      })}
    </>
  );
};
