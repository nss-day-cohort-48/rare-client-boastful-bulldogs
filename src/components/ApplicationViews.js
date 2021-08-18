import React from "react";
import { Route } from "react-router-dom";
import { PostProvider } from "./posts/PostProvider";
import { PostList } from "./posts/PostList";
import { Post } from "./posts/Post";
import { MyPost } from "./posts/MyPost";
import { MyPostList } from "./posts/MyPostList";
import { CategoriesList } from "./category/CategoryList";
import { CategoryProvider } from "./category/CategoryProvider";
import { PostForm } from "./posts/PostForm";
import { PostEdit } from "./posts/PostEdit";
import { TagsProvider } from "./tags/TagsProvider";
import { CategoryForm } from "./category/CategoryForm";
import { TagsList } from "./tags/TagsList";
import { TagsForm } from "./tags/TagsForm";
import { CommentProvider } from "./comments/CommentProvider";
import { CommentList } from "./comments/CommentsList";
import { ProfileProvider } from "./auth/AuthProvider"
import { CommentForm } from "./comments/CommentForm";
import { CommentEdit } from "./comments/CommentEdit";


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
      <ProfileProvider>
        <TagsProvider>
          <CategoryProvider>
            <PostProvider>
              <CommentProvider>
                <Route exact path="/posts">
                  <PostList />
                </Route>

                <Route exact path="/newpost">
                  <PostForm />
                </Route>

                <Route exact path="/posts/:postId(\d+)">
                  <Post />
                </Route>

                <Route path="/posts/edit/:postId(\d+)">
                  <PostEdit />
                </Route>

                <Route exact path="/myposts">
                  <MyPostList />
                </Route>

                <Route exact path="/myposts/:postId(\d+)">
                  <MyPost />
                </Route>

                <Route path="/comments/:postId(\d+)">
                  <CommentList />
                </Route>

                <Route path="/comments/edit/:commentId(\d+)">
                    <CommentEdit />
                </Route>
              </CommentProvider>
            </PostProvider>
          </CategoryProvider>
        </TagsProvider>

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

          <Route exact path="/tags/create">
            <TagsForm />
          </Route>

          <Route path="/tags/edit/:tagId(\d+)">
            <TagsForm />
          </Route>
        </TagsProvider>
      </ProfileProvider>
    </>
  );
};
