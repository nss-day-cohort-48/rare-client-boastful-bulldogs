import React, { useEffect, useContext } from "react"
import { PostContext } from "./PostProvider"
import "./Post.css"


export const MyPostList = () => {
    const { posts, getPostsByUserId } = useContext(PostContext)
    const userId = parseInt(localStorage.getItem("rare_user_id"))

    useEffect(() => {
        getPostsByUserId(userId)
    }, [])

    const sortedPosts = posts.sort((a, b) => {
        return b.publication_date - a.publication_date
    })

    return (
        <>
            <h1>My Posts</h1>
            {
                posts.map(post => {
                    return (
                        <>
                        <div>Title: {post.title}</div>
                        <div>Author: {post.user.first_name} {post.user.last_name}</div>
                        <div>Category: {post.category.label}</div>
                        </>
                    )
                })
            }

        </>
    )
}