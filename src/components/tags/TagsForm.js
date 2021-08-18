import React, { useContext, useEffect, useState } from "react";
import { TagsContext } from "./TagsProvider";
import { useHistory, useParams } from "react-router-dom";

export const TagsForm = () => {
  const { addTag, getTagById, editTag } = useContext(TagsContext);
  const history = useHistory();
  const { tagId } = useParams();
  const [tag, setTag] = useState({ label: "" });
  const [showTagField, setTagField] = useState(false);
  const onClick = () => setTagField(!showTagField);
  const [isLoading, setIsLoading] = useState(true);

  const handleControlledInputChange = (event) => {
    const newTag = { ...tag };
    newTag[event.target.id] = event.target.value;
    setTag(newTag);
  };

  useEffect(() => {
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (tagId) {
      getTagById(tagId).then((tag) => {
        setTag({
          id: parseInt(tagId),
          label: tag.label,
        });
      });
    }
  }, [tagId]);

  const handleSaveTag = () => {
    setIsLoading(true);
    // eslint-disable-next-line no-lone-blocks
    {
      tagId
        ? editTag({
            id: parseInt(tagId),
            label: tag.label,
          }).then(() => history.push("/tags"))
        : addTag({
            label: tag.label,
          }).then(() => history.push("/tags"));
    }
  };

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
                value={tag.label}
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
                handleSaveTag(tag);
                // const editedTag = {
                //   label: tag.label,
                // };
                // editTag(editedTag).then(() => history.push("/tags"));
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
          {showTagField ? (
            <>
              <form>
                <h3>Create a New Tag</h3>
                <fieldset>
                  <div className="button_container">
                    <input
                      type="text"
                      id="label"
                      name="label"
                      value={tag.label}
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
