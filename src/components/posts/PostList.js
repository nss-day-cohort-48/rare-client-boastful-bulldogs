import React, { useEffect, useContext } from "react"
import { PostContext } from "./PostProvider"
import { Link, useHistory } from "react-router-dom"
import Swal from "sweetalert2"
import "./Post.css"


export const PostList = () => {
    const { posts, getAllPosts, getPostById, deletePost } = useContext(PostContext)
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

    const handleDeleteModal = (postId) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You will not be able to undo!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "Ah, cancel"
        }).then((result) => {
            if (result.isConfirmed) {
                deletePost(postId).then(() => {
                    Swal.fire(
                        "Deleted!",
                        "Your post has been deleted.",
                        "Success!"
                    ).then(getAllPosts)
                })
            };
        })
    };

    return (
        <section>
            <h1 className="post-title">All Posts</h1>

            {sortedPosts.map(post => {
                return (
                    <>
                        <div className="post-list">
                            <div>
                                <div>Title: <Link className="title_link" onClick={() => { handlePostClick(post.id) }}>{post.title}</Link></div>
                                <div>Author: {post.user.full_name} </div>
                                <div>Category: {post.category.label}</div>
                            </div>
                        </div>
                        {post.owner ? (
                            <div>
                                <button onClick={() => { handleDeleteModal(post.id) }} className="button is-rounded remove">Delete
                                    <img className="trashIconPic" src="https://img.icons8.com/material/24/000000/trash--v1.png" /></button>

                            </div>) : (
                            <></>
                        )}
                    </>
                );

            })}



        </section>
    )
}