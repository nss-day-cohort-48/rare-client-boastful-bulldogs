import React, { useEffect, useContext } from "react"
import { PostContext } from "./PostProvider"
import "./Post.css"


export const PostList = () => {
    const { posts, getAllPosts } = useContext(PostContext)

    useEffect(() => {
        getAllPosts()
    }, [])

    const sortedPosts = posts.sort((a, b) => {
        return b.publication_date - a.publication_date
    })


    return (
        <>
            <h1>All Posts</h1>

            {
                sortedPosts.map(post => {
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