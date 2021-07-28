import React from "react"
import { useContext, useEffect, useState } from "react"
import { useHistory, useParams } from "react-router-dom"
import { PostContext } from "./PostProvider"

export const Post = () => {
  const { getPostById } = useContext(PostContext)
 
  const history = useHistory()
  const { postId } = useParams()

  const [ postDetail, setPostDetail ] = useState()

  useEffect(() => {
    getPostById(parseInt(postId))
        .then((data) => setPostDetail(data))
  }, [])

  return (
    
        <section className="postDetail__container">
            <div>Title: {postDetail.title}</div>
            <div>Author: {postDetail.user.first_name} {postDetail.user.last_name}</div>
            <div>Category: {postDetail.category.label}</div>
        </section>
      
      
      )
}