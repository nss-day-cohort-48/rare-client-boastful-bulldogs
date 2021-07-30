import React, { useContext, useEffect, useState } from "react"
import { useHistory, useParams } from "react-router"
import { CommentContext } from "./CommentProvider"


export const CommentForm = () => {
    const { createComment } = useContext(CommentContext)

    const [ comments, setComments ] = useState({
        post_id: 0,
        author_id: 0,
        content: "",
        created_on: ""
    })
    
    const userId = parseInt(localStorage.getItem("rare_user_id"))
    const { postId } = useParams()
    const history = useHistory()

    const handleControlledInputChange = (event) => {
        const newComment =  {...comments}
        newComment[event.target.name] = event.target.value
        setComments(newComment)
    }

    const handleSaveComment = () => {

        if (comments.content === "" ) {
            window.alert('Please fill in comment field before submitting')
        } else {
            const newComment = {
                post_id: parseInt(postId),
                author_id: userId,
                content: comments.content,
                created_on: new Date().toLocaleDateString()
            }
            createComment(newComment)
            // .then(() => history.push(`/posts/${postId}`))
        }
    }

    return (
        <>
            <h1>New Comment</h1>

            <form className="flex comments">
        
                <fieldset>
                <div>
                    <label htmlFor="comment">Comment:</label>
                    <input value={comments.content} type="content" id="content" name="content" onChange={handleControlledInputChange}/>
                </div>
                </fieldset>

                <button onClick={(event) => {
                    event.preventDefault()
                    handleSaveComment()
                    history.push(`/posts/${postId}`)
                }}>Save Comment</button>
            </form>
        </>
    )
}