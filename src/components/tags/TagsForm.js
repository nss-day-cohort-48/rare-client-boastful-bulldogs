import React, { useContext, useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { TagsContext } from "./TagsProvider";

export const EntryForm = (props) => {
  const { addTag, getTags, tag, setTag } = useContext(TagsContext);
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getTags();
  }, []);

  const [tagObj, setTagObj] = useState({
    label: "",
  });

  const handleControlledInputChange = (event) => {
    const new_tag = Object.assign({}, tag);
    new_tag[event.target.name] = event.target.value;
    setTag(new_tag);
  };

  const constructNewTag = () => {
    addTag({
      label: tag.label,
    });
    setTag({ label: "" });
  };

  const handleSaveTag = () => {
    //disable the button - no extra clicks
    setIsLoading(true);
    addTag(tagObj)
      .then(getTags)
      // .then(() => history.push("/upcoming"));
      .then(() => history.push("/tags"));
  };

  return (
    <form className="EntryForm">
      <h2 className="EntryForm__title">Create Tag</h2>
      <fieldset>
        <div className="form-group">
          <label htmlFor="label">Label: </label>
          <input
            type="text"
            name="label"
            required
            autoFocus
            className="form-control"
            proptype="varchar"
            placeholder="label"
            value={tag.label}
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
        Save Tag
      </button>
    </form>
  );
};
