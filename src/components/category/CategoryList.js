import React, { useEffect, useContext } from "react";
import { CategoryContext } from "./CategoryProvider";
import { CategoryForm } from "./CategoryForm";
import { useHistory } from "react-router-dom";
import { ProfileContext } from "../auth/AuthProvider.js";
import "./Category.css";

export const CategoriesList = () => {
  const { category, categories, getAllCategories, deleteCategory } =
    useContext(CategoryContext);
  const history = useHistory();
  const { profile, getProfile } = useContext(ProfileContext);

  useEffect(() => {
    getAllCategories();
    getProfile();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const sortedcategories = [...categories].sort((a, b) => {
    return a.label.localeCompare(b.label);
  });

  const handleDelete = (categoryId) => {
    deleteCategory(categoryId).then(history.push("/categories"));
  };

  // useEffect(() => {
  //   getAllCategories();
  // }, []);

  return (
    <>
      <h1>All Categories</h1>
      <br></br>
      {profile.user?.is_staff ? <CategoryForm /> : ""}
      <br></br>
      {sortedcategories.map((category) => {
        return (
          <>
            <div>ID: {category.id}</div>
            <div>Label: {category.label}</div>
            <button>Edit Category</button>
            {/* <button onClick={() => handleDelete(category.id)}> */}
            {profile.user?.is_staff ? (
              <button onClick={() => handleDelete(category.id)}>
                Delete category
              </button>
            ) : (
              ""
            )}
          </>
        );
      })}
    </>
  );
};
