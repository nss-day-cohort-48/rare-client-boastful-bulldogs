import React from "react";
import { Route } from "react-router-dom";
import { PostProvider } from "./posts/PostProvider";
import { PostList } from "./posts/PostList";
import { Post } from "./posts/Post";
import { MyPostList } from "./posts/MyPostList";
import { PostForm } from "./posts/PostForm"
import { TagsProvider } from "./tags/TagsProvider";
import { TagsList } from "./tags/TagsList";
import { TagsForm } from "./tags/TagsForm";


export const ApplicationViews = () => {
  return (
    <>
      <main
        style={{
          margin: "5rem 2rem",
          lineHeight: "1.75rem",
        }}
      ></main>

        {/* Render Posts */}
      <PostProvider>
        <Route exact path="/posts">
            <PostList/>
        </Route>
            
        <Route exact path="/newpost">
            <PostForm/>
        </Route>
                
        <Route exact path="/posts/:postId(\d+)">
          <Post />
        </Route>

        <Route exact path="/myposts">
          <MyPostList />
        </Route>
      </PostProvider>

      {/* Tag Manager */}
      <TagsProvider>
        <Route exact path="/tags">
          <TagsList />
        </Route>

        <Route exact path="/tags/create">
          <TagsForm />
        </Route>
      </TagsProvider>
    </>
  );
};
