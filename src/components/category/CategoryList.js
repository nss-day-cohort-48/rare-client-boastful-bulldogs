import React, { useEffect, useContext } from "react";
import { CategoryContext } from "./CategoryProvider";
import { Link } from "react-router-dom";
import "./Category.css";

export const CategoriesList = () => {
const { categories, getAllCategories } = useContext(CategoryContext);

useEffect(() => {
    getAllCategories();
}, []);

const sortedCategories = categories.sort((a,b) => {
    return a.label.localeCompare(b.label)
})

return (
    <>
    <h1>All Categories</h1>

    {sortedCategories.map((category) => {
        return (
        <>
            <div>{category.label}</div>
        </>
        );
    })}

    <Link to="/categories/create"><button> Create Category</button></Link>

    </>
);
};
