import React, { useEffect, useContext } from "react";
import { CategoryContext } from "./CategoryProvider";
import { Link, useHistory } from "react-router-dom";
import "./Category.css";

export const CategoriesList = () => {
const { categories, getAllCategories, deleteCategory } = useContext(CategoryContext);

useEffect(() => {
    getAllCategories();
}, []);

const sortedCategories = categories.sort((a,b) => {
    return a.label.localeCompare(b.label)
})

const history = useHistory()

const handleDelete = (id) => {
    deleteCategory(id)
    // .then(getAllCategories)
    .then(history.push("/categories"))
}

return (
    <>
    <h1>All Categories</h1>

    {sortedCategories.map((category) => {
        return (
        <>
            <div>{category.label}</div>
            <button onClick={() => handleDelete(category.id)}>Delete Category</button>
            
        </>
        );
    })}

    <Link to="/categories/create"><button> Create Category</button></Link>

    </>
);
};
