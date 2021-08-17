import { useHistory } from "react-router-dom";
import { CategoryContext } from "./CategoryProvider";
import React, { useContext, useEffect, useState } from "react";

export const CategoryForm = () => {
  const { createCategory } = useContext(CategoryContext);
  const history = useHistory();
  const [category, setCategory] = useState({});
  const [showNewCategoryField, setNewCateogyField] = useState(false);
  const onClick = () => setNewCateogyField(!showNewCategoryField);
  const [isLoading, setIsLoading] = useState(true);

  const handleControlledInputChange = (event) => {
    const newCategory = { ...category };
    newCategory[event.target.id] = event.target.value;
    setCategory(newCategory);
  };

  const handleSaveCategory = () => {
    setIsLoading(true);
    createCategory({
      label: category.label,
    }).then(() => history.push("/categories"));
  };

  useEffect(() => {
    setIsLoading(false);
  }, []);

  return (
    <>
      {showNewCategoryField ? (
        <form>
          <h3>Create a New Category</h3>
          <fieldset>
            <div className="button_container">
              <input
                type="text"
                id="label"
                name="label"
                required
                autoFocus
                placeholder="New Category Label"
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
                handleSaveCategory();
                // setCategory({});
                onClick();
              }}
            >
              Save Category
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
            Create a New Category
          </button>
          <br></br>
        </>
      )}
    </>
  );
};
