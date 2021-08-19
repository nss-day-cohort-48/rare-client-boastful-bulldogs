import React from "react"
import { useContext, useEffect, useState } from "react"
import { useHistory, useParams } from "react-router-dom"
import { PostContext } from "./PostProvider"
import { HumanDate } from "../utils/HumanDate"

export const MyPost = () => {
  const { getPostById, deletePost, getPostsByUserId } = useContext(PostContext)
  const userId = parseInt(localStorage.getItem("rare_user_id"))
 
  const history = useHistory()
  const { postId } = useParams()

  const [ postDetail, setPostDetail ] = useState({})

  useEffect(() => {
    getPostById(parseInt(postId))
        .then((data) => setPostDetail(data))
  }, [])

  const handleDelete = (postId) => {
    deletePost(parseInt(postId))
    // .then(getPostsByUserId(userId))
    .then(history.push("/myposts"))
  }
  
  
  return (
    
        <section className="postDetail__container">
          <div>
              <div>Title: {postDetail.title}</div>
              <img src={postDetail.image_url} alt="header" />
              <div>{postDetail.content}</div>
              <div>Author: {postDetail.user?.full_name}</div>
              <div>Date: {postDetail.publication_date}</div>
              <div>Category: {postDetail.category?.label}</div>
              <div>Tags: {postDetail.tags?.map((t) => <li>{t.label}</li>)}</div>
            </div>
            <div>
            
            <div className="post-buttons">
                <button className="post-button" onClick={() => history.push(`/posts/edit/${postDetail.id}`)}>Edit</button>
                <button className="post-button" onClick={handleDelete}>Delete</button>
            </div>
            
            </div>
        </section>

    )
}