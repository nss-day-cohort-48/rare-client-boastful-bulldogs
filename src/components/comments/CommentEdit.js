import React, { useContext, useEffect, useState } from "react"
import { useHistory, useParams } from "react-router"
import { CommentContext } from "./CommentProvider"
import { DateTime } from "luxon";

export const CommentForm = () => {
    const { getCommentById, editComment } = useContext(CommentContext)
    
    const userId = localStorage.getItem("rare_user_id")
    const { commentId } = useParams()
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
                created_on: now.toISO()
            }
            createComment(newComment)
        }
    }
    
    return (
        <>
            <h2>Edit Comment</h2>

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
                }}>Update Comment</button>
            </form>
        </>
    )
}