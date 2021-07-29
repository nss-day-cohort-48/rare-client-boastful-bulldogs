import React, { useContext, useEffect, useState } from "react";
import { TagsContext } from "./TagsProvider";
import { useHistory } from "react-router-dom";

export const TagsForm = () => {
  const { addTag } = useContext(TagsContext);
  const history = useHistory();
  const [tag, setTag] = useState({});
  const [showNewTagField, setNewTagField] = useState(false);
  const onClick = () => setNewTagField(!showNewTagField);
  const [isLoading, setIsLoading] = useState(true);

  const handleControlledInputChange = (event) => {
    const newTag = { ...tag };
    newTag[event.target.id] = event.target.value;
    setTag(newTag);
  };

  const handleSaveTag = () => {
    setIsLoading(true);
    addTag({
      label: tag.label,
    }).then(() => history.push("/tags"));
  };

  useEffect(() => {
    setIsLoading(false);
  }, []);

  return (
    <>
      {showNewTagField ? (
        <form>
          <h3>Create a New Tag</h3>
          <fieldset>
            <div className="button_container">
              <input
                type="text"
                id="label"
                name="label"
                required
                autoFocus
                placeholder="New Tag Label"
                onChange={handleControlledInputChange}
              />
            </div>
          </fieldset>
          {/* BUTTONS */}
          <div>
            {/* SAVE BUTTON */}
            <button
              disabled={isLoading}
              onClick={(event) => {
                event.preventDefault();
                handleSaveTag();
                setTag({});
              }}
            >
              Save Tag
            </button>
            {/* CANCEL BUTTON */}
            <button
              className="button cancel_button"
              onClick={() => {
                onClick();
              }}
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <>
          <button
            className="button cancel_button"
            onClick={() => {
              onClick();
            }}
          >
            Create a New Tag
          </button>
          <br></br>
        </>
      )}
    </>
  );
};
