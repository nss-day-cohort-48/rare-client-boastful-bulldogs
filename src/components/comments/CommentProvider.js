import React, { useState, createContext } from "react"

export const CommentContext = createContext()


export const CommentProvider = (props) => {
    const [comments, setComments] = useState([])

    const getCommentsByPostId = postId => {
        return fetch(`http://localhost:8088/comments/${postId}`)
        .then(res => res.json())
        .then(setComments)
    }

    const createComment = commentObj => {
        return fetch("http://localhost:8088/comments", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(commentObj)
        })
        .then(getCommentsByPostId)
    }

    return (
        <CommentContext.Provider value= {
            {
                getCommentsByPostId, createComment, comments
            }
        }>
            {props.children}
        </CommentContext.Provider>
    )
}