import React, { useContext, useEffect, useState } from "react";
import { TagsContext } from "./TagsProvider";
import { useHistory, useParams } from "react-router-dom";

export const TagsForm = () => {
  const { addTag, getTagById, editTag } = useContext(TagsContext);
  const history = useHistory();
  const { tagId } = useParams();
  const [tag, setTag] = useState({ label: "" });
  const [showNewTagField, setNewTagField] = useState(false);
  const onClick = () => setNewTagField(!showNewTagField);
  const [isLoading, setIsLoading] = useState(true);

  const handleControlledInputChange = (event) => {
    const newTag = { ...tag };
    newTag[event.target.id] = event.target.value;
    setTag(newTag);
  };

  useEffect(() => {
    if (tagId) {
      getTagById(tagId).then((tag) => {
        setTag({
          label: tag.label,
        });
      });
    }
  }, [tagId]);

  // const handleSaveTag = () => {
  //   setIsLoading(true);
  //   addTag({
  //     label: tag.label,
  //   }).then(() => history.push("/tags"));
  // };

  useEffect(() => {
    setIsLoading(false);
  }, []);

  return (
    <>
      {/* tagId ? PASS IN PARAMS : show everything else */}
      {tagId ? (
        <form>
          <h3>Edit Tag</h3>
          <fieldset>
            <div className="button_container">
              <input
                type="text"
                id="label"
                name="label"
                required
                autoFocus
                onChange={handleControlledInputChange}
              />
            </div>
          </fieldset>
          {/* BUTTONS */}
          <div>
            {/* SAVE BUTTON */}
            <button
              // disabled={isLoading}
              onClick={(event) => {
                event.preventDefault();
                const editedTag = {
                  label: tag.label,
                };
                editTag(editedTag).then(() => history.push("/tags"));
                onClick();
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
          {showNewTagField ? (
            <>
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
                    // disabled={isLoading}
                    onClick={(event) => {
                      event.preventDefault();
                      setIsLoading(true);
                      addTag({
                        label: tag.label,
                      }).then(() => history.push("/tags"));
                      // setTag({});
                      onClick();
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
            </>
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
      )}
    </>
  );
};
