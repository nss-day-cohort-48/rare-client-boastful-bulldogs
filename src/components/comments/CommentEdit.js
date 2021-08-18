import React, { useContext, useEffect, useState } from "react"
import { useHistory, useParams } from "react-router"
import { CommentContext } from "./CommentProvider"
import { DateTime } from "luxon";

export const CommentEdit = () => {
    const { getCommentById, editComment } = useContext(CommentContext)
    const [comment, setComment] = useState([])
    const userId = localStorage.getItem("rare_user_id")
    const { commentId } = useParams()
    const history = useHistory()
    const now = DateTime.now()

    useEffect(() => {
        if (commentId) {
            getCommentById(parseInt(commentId)).then((comment) => {
                setComment({
                    id: comment.id,
                    post_id: comment.post.id,
                    author: comment.author.id,
                    content: comment.content,
                    created_on: comment.created_on
                })
            })
        }
    }, [commentId])

    const handleControlledInputChange = (event) => {
        const newComment =  {...comment}
        newComment[event.target.name] = event.target.value
        setComment(newComment)
    }

    const handleSaveComment = () => {

        if (comment.content === "" ) {
            window.alert('Please fill in comment field before submitting')
        } else {
            const newComment = {
                id: comment.id,
                post_id: comment.post.id,
                author: comment.author.id,
                content: comment.content,
                created_on: now.toISO()
            }
            editComment(newComment)
        }
    }


    return (
        <>
            <h2>Edit Comment</h2>

            <form className="flex comments">
        
                <fieldset>
                <div>
                    <label htmlFor="comment">Comment:</label>
                    <input value={comment.content} type="content" id="content" name="content" onChange={handleControlledInputChange}/>
                </div>
                </fieldset>

                <button onClick={(event) => {
                    event.preventDefault()
                    handleSaveComment()
                    history.push(`/posts`)
                }}>Update Comment</button>
            </form>
        </>
    )
}