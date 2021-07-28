import React, { useEffect, useContext } from "react"
import { PostContext } from "./PostProvider"
import "./Post.css"


export const PostList = () => {
    const { getAllPosts } = useContext(PostContext)
}