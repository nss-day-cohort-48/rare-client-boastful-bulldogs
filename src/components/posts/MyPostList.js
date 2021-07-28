import React, { useEffect, useContext } from "react"
import { PostContext } from "./PostProvider"
import "./Post.css"


export const PostList = () => {
    const { posts, getAllPosts, getPostsByUserId } = useContext(PostContext)
    const userId = parseInt(localStorage.getItem("rare_user_id"))

    useEffect(() => {
        getAllPosts()
    }, [])

    const sortedPosts = posts.sort((a, b) => {
        return b.publication_date - a.publication_date
    })
}