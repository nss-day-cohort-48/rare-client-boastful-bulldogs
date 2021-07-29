import React from "react"
import { useContext, useEffect, useState } from "react"
import { useHistory, useParams } from "react-router-dom"
import { PostContext } from "./PostProvider"
import { HumanDate } from "../utils/HumanDate"

export const Post = () => {
  const { getPostById } = useContext(PostContext)
 
  const history = useHistory()
  const { postId } = useParams()

  const [ postDetail, setPostDetail ] = useState({})

  useEffect(() => {
    getPostById(parseInt(postId))
        .then((data) => setPostDetail(data))
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
            <div>Title: {postDetail.title}</div>
            <img src={postDetail.image_url} alt="header" />
            <div>{postDetail.content}</div>
            <div>Author: {postDetail.user?.first_name} {postDetail.user?.last_name}</div>
            <div>Date: {postDetail.publication_date}</div>
            <div>Category: {postDetail.category?.label}</div>
        </section>
      
      
    //   <div>Date: <HumanDate date={postDetail.publication_date}/></div>
      )
}