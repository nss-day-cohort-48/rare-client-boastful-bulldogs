import { useHistory, useParams } from "react-router-dom";
import { CategoryContext } from "./CategoryProvider";
import React, { useContext, useEffect, useState } from "react";

export const CategoryForm = () => {
  const { createCategory, getCategoryById, editCategory } =
    useContext(CategoryContext);
  const history = useHistory();
  const { categoryId } = useParams();
  const [category, setCategory] = useState({ label: "" });
  const [showCategoryField, setCategoryField] = useState(false);
  const onClick = () => setCategoryField(!showCategoryField);
  const [isLoading, setIsLoading] = useState(true);

  const handleControlledInputChange = (event) => {
    const newCategory = { ...category };
    newCategory[event.target.id] = event.target.value;
    setCategory(newCategory);
  };

  const handleSaveCategory = () => {
    setIsLoading(true);
    // eslint-disable-next-line no-lone-blocks
    {
      categoryId
        ? editCategory({
            id: parseInt(categoryId),
            label: category.label,
          }).then(() => history.push("/categories"))
        : createCategory({
            label: category.label,
          }).then(() => history.push("/categories"));
    }
  };

  useEffect(() => {
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (categoryId) {
      getCategoryById(categoryId).then((category) => {
        setCategory({
          id: parseInt(categoryId),
          label: category.label,
        });
      });
    }
  }, [categoryId]);

  return (
    <>
      {/* categoryId ? PASS IN PARAMS : another ternary for showing everything else */}
      {categoryId ? (
        <form>
          <h3>Edit Category</h3>
          <fieldset>
            <div className="button_container">
              <input
                type="text"
                id="label"
                name="label"
                value={category.label}
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
                handleSaveCategory(category);
              }}
            >
              Save Category
            </button>
            {/* CANCEL BUTTON */}
            <button
              className="button cancel_button"
              onClick={() => {
                history.push("/categories");
              }}
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <>
          {showCategoryField ? (
            <>
              <form>
                <h3>Create a New Category</h3>
                <fieldset>
                  <div className="button_container">
                    <input
                      type="text"
                      id="label"
                      name="label"
                      value={category.label}
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
                      setIsLoading(true);
                      handleSaveCategory();
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
            </>
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
      )}
    </>
  );
};
