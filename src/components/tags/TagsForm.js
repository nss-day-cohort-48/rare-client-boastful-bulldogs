import React, { useContext, useState, useEffect } from "react";
import { TagsContext } from "./TagsProvider";

export const EntryForm = (props) => {
  const { addTag, getTags, tag, setTag } = useContext(TagsContext);

  const [editMode, editModeChanged] = useState(false);

  useEffect(() => {
    getTags();
  }, []);

  useEffect(() => {
    if ("id" in tag) {
      editModeChanged(true);
    } else {
      editModeChanged(false);
    }
  }, [tag]);

  const handleControlledInputChange = (event) => {
    /*
            When changing a state object or array, always create a new one
            and change state instead of modifying current one
        */
    const new_tag = Object.assign({}, tag);
    new_tag[event.target.name] = event.target.value;
    setTag(new_tag);
  };

  const constructNewTag = () => {
    let d = new Date();
    if (editMode) {
      updateEntry({
        id: tag.id,
        concept: tag.concept,
        body: tag.body,
        entry_date: tag.entry_date,
        mood_id: parseInt(tag.mood_id),
      });
    } else {
      addTag({
        concept: tag.concept,
        body: tag.body,
        entry_date: d.toLocaleDateString("en-US"),
        mood_id: parseInt(tag.mood_id),
      });
    }
    setTag({ concept: "", tag: "", mood_id: 0 });
  };

  return (
    <form className="EntryForm">
      <h2 className="EntryForm__title">
        {editMode ? "Update tag" : "Create tag"}
      </h2>
      <fieldset>
        <div className="form-group">
          <label htmlFor="concept">Concept: </label>
          <input
            type="text"
            name="concept"
            required
            autoFocus
            className="form-control"
            proptype="varchar"
            placeholder="Concept"
            value={tag.concept}
            onChange={handleControlledInputChange}
          />
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label htmlFor="body">tag: </label>
          <input
            type="text"
            name="body"
            required
            className="form-control"
            proptype="varchar"
            placeholder="tag Body"
            value={tag.body}
            onChange={handleControlledInputChange}
          />
        </div>
      </fieldset>
      <button
        type="submit"
        onClick={(evt) => {
          evt.preventDefault();
          constructNewTag();
        }}
        className="btn btn-primary"
      >
        {editMode ? "Update" : "Save"}
      </button>
    </form>
  );
};
