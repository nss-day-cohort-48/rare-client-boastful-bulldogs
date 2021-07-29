import React, { useEffect, useContext } from "react";
import { CategoryContext } from "./CategoryProvider";
import { Link } from "react-router-dom";
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
            <div>{category.label}</div>
        </>
        );
    })}

    <Link to="/categories/create"><button> Create New Category</button></Link>

    </>
);
};
