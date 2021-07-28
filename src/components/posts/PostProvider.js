import React, { useState, createContext } from "react"

export const PostContext = createContext()


export const PostProvider = (props) => {
    const [posts, setPosts] = useState([])

    const getAllPosts = () => {
        return fetch("http://localhost:8088/posts")
        .then(res => res.json())
        .then((data) => setPosts(data)) // updates state with posts from server
    }

    const getPostById = postId => {
        return fetch(`http://localhost:8088/posts/${postId}`)
        .then(res => res.json())
    }

    const getPostsByUserId = userId => {
        return fetch(`http://localhost:8088/myposts/${userId}`)
        .then(res => res.json())
        .then(setPosts)
    }


    return (
        <PostContext.Provider value= {
            {
                posts, getAllPosts, getPostById,
                getPostsByUserId
            }
        }>
            {props.children}
        </PostContext.Provider>
    )
}