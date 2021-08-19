import React from "react"
import { useContext, useEffect, useState } from "react"
import { useHistory, useParams } from "react-router-dom"
import { PostContext } from "../posts/PostProvider"
import { CommentContext } from "../comments/CommentProvider"
import { CommentForm } from "./CommentForm"
import Swal from "sweetalert2"
import "./Comments.css"


export const CommentList = () => {
  const { getPostById } = useContext(PostContext);
  const { comments, getCommentsByPostId, deleteComment } =
    useContext(CommentContext);

  const history = useHistory();
  const { postId } = useParams();

  const [postDetail, setPostDetail] = useState({});

  useEffect(() => {
    getPostById(parseInt(postId)).then((data) => setPostDetail(data));
  }, []);

  useEffect(() => {
    getCommentsByPostId(postId);
  }, []);

  const sortedComments = comments.sort((a, b) => {
    return b.created_on.localeCompare(a.created_on);
  });

  // const handleDelete = (commentId) => {
  //   deleteComment(commentId).then(window.location.reload());
  // };

  const handleDeleteCard = (commentId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will not be able to undo!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Ah, cancel"
    }).then((result) => {
      if (result.isConfirmed) {
        deleteComment(commentId).then(() => {
          Swal.fire(
            "Deleted!",
            "Your comment has been deleted.",
            "Success!"
          ).then(getCommentsByPostId(parseInt(postId)))
        })
      }; 
  })
};


  return (
    <section className="comment__container">
      <h1>Comments For {postDetail.title}</h1>
      <button
        className="comment-btn"
        onClick={() => {
          history.push(`/posts/${postId}`);
        }}
      >
        Go Back
      </button>
      <div className="comment__flex">
        <br></br>
        <CommentForm />
        <br></br>
        <div>
          {sortedComments.map((comment) => {
            return (
              <>
                <div>{comment.content}</div>
                <div>Author: {comment.author.full_name}</div>
                <div>Date created: {comment.created_on}</div>
                {comment.owner ? (
                  <div>
                    <button onClick={() => 
                      {handleDeleteCard(comment.id)}} className="button is-rounded remove">Delete
                      <img className="trashIconPic" src="https://img.icons8.com/material/24/000000/trash--v1.png"/></button>
                    {/* <button className="comment-btn" onClick={() => {
                        handleDelete(comment.id)}}>Delete</button> */}
                    <button className="comment-btn" onClick={() => {
                        history.push(`/comments/edit/${comment.id}`)
                      }}> Edit </button>
                  </div>
                ) : (
                  <></>
                )}
                <br></br>
                <br></br>
              </>
            );
          })}
        </div>
      </div>
    </section>
  );
}