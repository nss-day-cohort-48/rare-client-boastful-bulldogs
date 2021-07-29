import React, { useContext, useEffect, useState } from "react";
import { TagsContext } from "./TagsProvider";
import { useHistory } from "react-router-dom";

export const TagsForm = () => {
  const { addTag, getAllTags } = useContext(TagsContext);
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
    })
      .then(getAllTags)
      .then(() => history.push("/tags"));
  };

  useEffect(() => {
    setIsLoading(false);
  }, []);

  return (
    <>
      {showNewTagField ? (
        <form>
          <fieldset>
            <div>
              <input
                type="text"
                id="label"
                name="label"
                required
                autoFocus
                placeholder="add text"
                onChange={handleControlledInputChange}
              />
            </div>
          </fieldset>
          <div>
            <button
              disabled={isLoading}
              onClick={(event) => {
                event.preventDefault();
                handleSaveTag();
                setTag({});
              }}
            >
              Create Tag
            </button>
          </div>
        </form>
      ) : (
        <>
          <button
            className="button create_tag_button"
            onClick={() => {
              onClick();
            }}
          >
            Create Tag
          </button>
          <button
            className="button cancel__button"
            onClick={() => {
              onClick();
            }}
          >
            {showNewTagField ? <>Back</> : <>Change</>}
          </button>
        </>
      )}
    </>
  );
};
