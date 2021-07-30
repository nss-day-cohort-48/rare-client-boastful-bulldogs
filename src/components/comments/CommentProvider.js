import React, { useState, createContext } from "react"

export const CommentContext = createContext()


export const CommentProvider = (props) => {
    const [comments, setComments] = useState([])

    const getAllComments = () => {
        return fetch("http://localhost:8088/comments")
        .then(res => res.json())
        .then((data) => setComments(data))
    }

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
                getCommentsByPostId, createComment,
                comments, getAllComments
            }
        }>
            {props.children}
        </CommentContext.Provider>
    )
}