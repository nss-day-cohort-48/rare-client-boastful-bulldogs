import React, { useEffect, useContext } from "react";
import { CategoryContext } from "./CategoryProvider";
import "./Category.css";

export const CategoriesList = () => {
const { categories, getAllCategories } = useContext(CategoryContext);

useEffect(() => {
    getAllCategories();
}, []);

return (
    <>
    <h1>All Categories</h1>

    {categories.map((category) => {
        return (
        <>
            <div>ID: {category.id}</div>
            <div>Label: {category.label}</div>
        </>
        );
    })}
    </>
);
};
