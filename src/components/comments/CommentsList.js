import React from "react"
import { useContext, useEffect, useState } from "react"
import { useHistory, useParams } from "react-router-dom"
import { PostContext } from "../posts/PostProvider"
import { CommentContext } from "../comments/CommentProvider"
import { CommentForm } from "./CommentForm"


export const CommentList = () => {
    const { getPostById } = useContext(PostContext)
    const { comments, getCommentsByPostId, deleteComment } = useContext(CommentContext)
   
    const history = useHistory()
    const { postId } = useParams()
  
    const [ postDetail, setPostDetail ] = useState({})
  
    useEffect(() => {
      getPostById(parseInt(postId))
          .then((data) => setPostDetail(data))
    }, [])

    useEffect(() => {
        getCommentsByPostId(postId)
    }, [])
    
    const sortedComments = comments.sort((a, b) => {
        return b.created_on.localeCompare(a.created_on);
      });

    const handleDelete = (commentId) => {
        deleteComment(commentId).then(window.location.reload())
    }
    
    return (
      
          <section className="postDetail__container">
              <h1>Comments For {postDetail.title}</h1>
              <button onClick={() => {
                history.push(`/posts/${postId}`)
              }}>Go Back</button>
              <br></br>
              <CommentForm />
              <br></br>
              <div>
                  {
                      sortedComments.map(comment => {
                          return (
                              <>
                                <div>{comment.content}</div>
                                <div>Author: {comment.author.full_name}</div>
                                <div>Date created: {comment.created_on}</div>
                                <button onClick={() => {
                                        handleDelete(comment.id)
                                        }}>Delete</button>
                                <br></br>
                                <br></br>
                            </>
                          )
                      })
                  }
              </div>
          </section>
        )
  }