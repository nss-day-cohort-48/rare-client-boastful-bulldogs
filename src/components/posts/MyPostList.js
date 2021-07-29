import React, { useEffect, useContext } from "react"
import { PostContext } from "./PostProvider"
import { Link, useHistory } from "react-router-dom"
import "./Post.css"


export const MyPostList = () => {
    const { posts, getPostsByUserId, getPostById } = useContext(PostContext)
    const userId = parseInt(localStorage.getItem("rare_user_id"))

    const history = useHistory()
    
    useEffect(() => {
        getPostsByUserId(userId)
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
            <h1 className="post-title">My Posts</h1>
            {
                sortedPosts.map(post => {
                    return (
                        <>
                        <div className="post-list">
                            {userId > 0 
                            ?
                            <div className="post-buttons">
                                <button className="post-button">Edit</button>
                                <button>Delete</button>
                            </div>
                            : 
                            <></>
                            }
                            <div>
                                <div>Title: <Link className="title_link" onClick={() => {handlePostClick(post.id)}}>{post.title}</Link></div>
                                <div>Author: {post.user.first_name} {post.user.last_name}</div>
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