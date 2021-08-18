import React from "react"
import { useContext, useEffect, useState } from "react"
import { useHistory, useParams } from "react-router-dom"
import { PostContext } from "./PostProvider"
import { CommentContext } from "../comments/CommentProvider"

export const Post = () => {
  const { getPostById } = useContext(PostContext)
  const { comments, getCommentsByPostId } = useContext(CommentContext)
 
  const history = useHistory()
  const { postId } = useParams()

  const [ postDetail, setPostDetail ] = useState({})

  useEffect(() => {
    getPostById(parseInt(postId))
        .then((data) => setPostDetail(data))
    getCommentsByPostId(parseInt(postId))
  }, [])

//   const date = postDetail.publication_date.toLocaleDateString("en-US",
//   {
//       weekday: 'long',
//       year: 'numeric',
//       month: 'long',
//       day: 'numeric',
//       timeZone: 'America/Chicago'
//   })
  
  return (
    
        <section className="postDetail__container">
            <h2>Title: {postDetail.title}</h2>
            <img src={postDetail.image_url} alt="header" />
            <div>{postDetail.content}</div>
            <div>Author: {postDetail.user?.full_name}</div>
            <div>Date: {postDetail.publication_date}</div>
            <div>Category: {postDetail.category?.label}</div>


            <button onClick={() => {
              history.push(`/comments/${postId}`)
            }}>View All Comments</button>

        </section>
      
      
    //   <div>Date: <HumanDate date={postDetail.publication_date}/></div>
      )
}