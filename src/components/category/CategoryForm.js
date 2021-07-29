import React, { useContext, useState } from "react"
import { useHistory } from "react-router-dom"
import { CategoryContext } from "./CategoryProvider"


export const CategoryForm = () => {

    const {createCategory} = useContext(CategoryContext)

    const [category, setCategory] = useState({})
    const history = useHistory();

    const handleControlledInputChange = (e) => {
        const newCategory = {...category}
        newCategory[e.target.id] = e.target.value
        setCategory(newCategory)
    }

    const handleSaveCategory = () => {
        createCategory({
            label: category.label
        })
        .then(() => history.push("/categories"))
    }

    return (
        <form>
            <h2>Create a new category</h2>
            <fieldset>
                <div>
                    <input type="text" id="label" name="label" required autoFocus placeholder="input category name"
                    onChange={handleControlledInputChange}/>
                </div>
            </fieldset>
            <div>
                <button
                onClick={e => {
                    e.preventDefault()
                    handleSaveCategory()
                    setCategory("")
                }}>Submit New Category</button>
            </div>
        </form>
    )

}