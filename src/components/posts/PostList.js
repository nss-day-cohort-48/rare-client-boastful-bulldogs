import React, { useEffect, useContext } from "react"
import { PostContext } from "./PostProvider"
import { Link, useHistory } from "react-router-dom"
import "./Post.css"


export const PostList = () => {
    const { posts, getAllPosts, getPostById } = useContext(PostContext)
    const userId = parseInt(localStorage.getItem("rare_user_id"))

    const history = useHistory()

    useEffect(() => {
        getAllPosts()
    }, [])

    const sortedPosts = posts.sort((a, b) => {
        return b.publication_date - a.publication_date
    })

    const handlePostClick = (id) => {
        getPostById(id)
        .then(() => history.push(`/posts/${id}`))
      }

    
    return (
        <>
            <h1 className="post-title">All Posts</h1>

            {
                sortedPosts.map(post => {
                    return (
                        <>
                        <div className="post-list">
                            <div>
                                <div>Title: <Link className="title_link" onClick={() => {handlePostClick(post.id)}}>{post.title}</Link></div>
                                <div>Author: {post.user.full_name} </div>
                                <div>Category: {post.category.label}</div>
                            </div>
                        </div>
                        </>
                    )
                })
            }
        </>
    )
}