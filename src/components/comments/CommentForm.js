import React, { useContext, useEffect, useState } from "react"
import { useHistory, useParams } from "react-router"
import { CommentContext } from "./CommentProvider"
import { DateTime } from "luxon";

export const CommentForm = () => {
    const { createComment } = useContext(CommentContext)

    const [ comments, setComments ] = useState({
        post_id: 0,
        author: "",
        content: "",
        created_on: ""
    })
    
    const userId = localStorage.getItem("rare_user_id")
    const { postId } = useParams()
    const history = useHistory()
    const now = DateTime.now()

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
                author: userId,
                content: comments.content,
                created_on: now.toISODate()
            }
            createComment(newComment)
        }
    }
    
    return (
        <>
            <h2>New Comment</h2>

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
                    // history.push(`/posts/${postId}`)
                    window.location.reload()
                }}>Save Comment</button>
            </form>
        </>
    )
}