import React, { useState, createContext } from "react"

export const CommentContext = createContext()


export const CommentProvider = (props) => {
    const [comments, setComments] = useState([])

    const getAllComments = () => {
        return fetch("http://localhost:8000/comments", {
            headers: {
                Authorization: `Token ${localStorage.getItem("rare_user_id")}`
            },
        })
        .then(res => res.json())
        .then((data) => setComments(data))
    }

    const getCommentsByPostId = postId => {
        return fetch(`http://localhost:8000/comments?postId=${postId}`, {
            headers: {
                Authorization: `Token ${localStorage.getItem("rare_user_id")}`
            },
        })
        .then(res => res.json())
        .then(setComments)
    }

    const createComment = commentObj => {
        return fetch("http://localhost:8000/comments", {
            method: "POST",
            headers: {
                Authorization: `Token ${localStorage.getItem("rare_user_id")}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(commentObj)
        })
        .then()
    }

    const deleteComment = commentId => {
        return fetch(`http://localhost:8000/comments/${commentId}`, {
          method: "DELETE",
          headers: {
            "Authorization": `Token ${localStorage.getItem("rare_user_id")}`
        },
        })
        .then()
    }


    return (
        <CommentContext.Provider value= {
            {
                getCommentsByPostId, createComment,
                comments, getAllComments, deleteComment
            }
        }>
            {props.children}
        </CommentContext.Provider>
    )
}