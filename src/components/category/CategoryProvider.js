import React, { useState, createContext } from "react";

export const CategoryContext = createContext();

export const CategoryProvider = (props) => {
const [categories, setCategories] = useState([]);

const getAllCategories = () => {
    return fetch("http://localhost:8088/categories")
    .then((res) => res.json())
      .then((data) => setCategories(data)); // updates state with tags from server
};

const getCategoryById = (category_id) => {
    return fetch(`http://localhost:8088/categories/${category_id}`).then((res) =>
    res.json()
    );
};

const createCategory = (newCategoryObj) => {
    return fetch (`http://localhost:8088/categories`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        }, 
        body: JSON.stringify(newCategoryObj)
    })
}

const deleteCategory = categoryId => {
    return fetch(`http://localhost:8088/category/${categoryId}`, {
        method: "DELETE"
    })
    .then(getAllCategories)
}

    return (
        <CategoryContext.Provider
        value={{
            categories,
            getAllCategories,
            getCategoryById,
            createCategory,
            deleteCategory,
        }}
        >
        {props.children}
        </CategoryContext.Provider>
    );
};
