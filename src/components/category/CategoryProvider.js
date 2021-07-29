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
    return fetch(`http://localhost:8088/tags/${category_id}`).then((res) =>
    res.json()
    );
};

    return (
        <CategoryContext.Provider
        value={{
            categories,
            getAllCategories,
            getCategoryById,
        }}
        >
        {props.children}
        </CategoryContext.Provider>
    );
};
