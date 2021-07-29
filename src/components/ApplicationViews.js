import React from "react";
import { Route } from "react-router-dom";
import { PostProvider } from "./posts/PostProvider";
import { PostList } from "./posts/PostList";
import { Post } from "./posts/Post";
import { MyPostList } from "./posts/MyPostList";
import { CategoriesList } from "./category/CategoryList";
import { CategoryProvider } from "./category/CategoryProvider";
import { TagsProvider } from "./tags/TagsProvider";
import { TagsList } from "./tags/TagsList";
import { CategoryForm } from "./category/CategoryForm";

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
          <PostList />
        </Route>

        <Route exact path="/posts/:postId(\d+)">
          <Post />
        </Route>

        <Route exact path="/myposts">
          <MyPostList />
        </Route>
      </PostProvider>

      <CategoryProvider>
        <Route exact path="/categories">
          <CategoriesList />
        </Route>
        <Route exact path="/categories/create">
          <CategoryForm />
        </Route>
      </CategoryProvider>

      {/* Tag Manager */}
      <TagsProvider>
        <Route exact path="/tags">
          <TagsList />
        </Route>
      </TagsProvider>
    </>
  );
};
