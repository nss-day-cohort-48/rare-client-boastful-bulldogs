import React, { useEffect, useContext } from "react";
import { CategoryContext } from "./CategoryProvider";
import { CategoryForm } from "./CategoryForm";
import { useHistory } from "react-router-dom";
import "./Category.css";

export const CategoriesList = () => {
  const { category, categories, getAllCategories, deleteCategory } =
    useContext(CategoryContext);
  const history = useHistory();

  useEffect(() => {
    getAllCategories();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const sortedcategories = [...categories].sort((a, b) => {
    return a.label.localeCompare(b.label);
  });

  const handleDelete = (categoryId) => {
    deleteCategory(categoryId).then(history.push("/categories"));
  };

  useEffect(() => {
    getAllCategories();
  }, []);

  return (
    <>
      <h1>All Categories</h1>
      <br></br>
      <CategoryForm />
      <br></br>
      {sortedcategories.map((category) => {
        return (
          <>
            <div>ID: {category.id}</div>
            <div>Label: {category.label}</div>
            <button>Edit Category</button>
            <button onClick={() => handleDelete(category.id)}>
              Delete category
            </button>
          </>
        );
      })}
    </>
  );
};
