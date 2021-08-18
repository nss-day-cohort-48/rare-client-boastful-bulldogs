import React, { useState, createContext } from "react";

export const CategoryContext = createContext();

export const CategoryProvider = (props) => {
  const [categories, setCategories] = useState([]);

  const getAllCategories = () => {
    return fetch("http://localhost:8000/categories", {
      headers: {
        Authorization: `Token ${localStorage.getItem("rare_user_id")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setCategories(data)); // updates state with categorys from server
  };

  const getCategoryById = (categoryId) => {
    return fetch(`http://localhost:8000/categories/${categoryId}`, {
      headers: {
        Authorization: `Token ${localStorage.getItem("rare_user_id")}`,
      },
    }).then((res) => res.json());
  };

  const createCategory = (newCategoryObj) => {
    return fetch(`http://localhost:8000/categories`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${localStorage.getItem("rare_user_id")}`,
      },
      body: JSON.stringify(newCategoryObj),
    }).then(getAllCategories);
  };

  const deleteCategory = (categoryId) => {
    return fetch(`http://localhost:8000/categories/${categoryId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Token ${localStorage.getItem("rare_user_id")}`,
      },
    }).then(getAllCategories);
  };

  const editCategory = (category) => {
    return fetch(`http://localhost:8000/categories/${category.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        headers: {
          Authorization: `Token ${localStorage.getItem("rare_user_id")}`,
        },
      },
      body: JSON.stringify(category),
    }).then(getAllCategories);
  };

  return (
    <CategoryContext.Provider
      value={{
        categories,
        getAllCategories,
        getCategoryById,
        createCategory,
        deleteCategory,
        editCategory,
      }}
    >
      {props.children}
    </CategoryContext.Provider>
  );
};
