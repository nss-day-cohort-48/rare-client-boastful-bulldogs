import React, { useEffect, useContext } from "react";
import { TagsContext } from "./TagsProvider";
import "./Tags.css";

export const TagList = () => {
  const { tags, getAllTags } = useContext(TagsContext);

  useEffect(() => {
    getAllTags();
  }, []);

  return (
    <>
      <h1>All Tags</h1>

      {tags.map((tag) => {
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
