import React, { useState, createContext } from "react";

export const PostContext = createContext();

export const PostProvider = (props) => {
  const [posts, setPosts] = useState([]);

  const getAllPosts = () => {
    return fetch("http://localhost:8000/posts")
      .then((res) => res.json())
      .then((data) => setPosts(data)); // updates state with posts from server
  };

  const getPostById = (postId) => {
    return fetch(`http://localhost:8000/posts/${postId}`).then((res) =>
      res.json()
    );
  };

  const getPostsByUserId = (userId) => {
    return fetch(`http://localhost:8000/myposts/${userId}`)
      .then((res) => res.json())
      .then(setPosts);
  };

  const deletePost = (postId) => {
    return fetch(`http://localhost:8000/posts/${postId}`, {
      method: "DELETE",
    }).then(getAllPosts);
  };

  const deleteMyPost = (postId) => {
    return fetch(`http://localhost:8000/myposts/${postId}`, {
      method: "DELETE",
    });
  };

  const addPost = (postObj) => {
    return fetch(`http://localhost:8000/posts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postObj),
    });
  };

  const updatePost = (postObj) => {
    return fetch(`http://localhost:8000/posts/${postObj.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postObj),
    }).then(getAllPosts);
  };

  return (
    <PostContext.Provider
      value={{
        posts,
        getAllPosts,
        getPostById,
        getPostsByUserId,
        deletePost,
        deleteMyPost,
        addPost,
        updatePost,
      }}
    >
      {props.children}
    </PostContext.Provider>
  );
};
