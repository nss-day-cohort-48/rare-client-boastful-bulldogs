import React from "react"
import { Route } from "react-router-dom"
import { PostProvider } from "./posts/PostProvider"
import { PostList } from "./posts/PostList"
import { MyPostList } from "./posts/MyPostList"

export const ApplicationViews = () => {
    return (
        <>
            <main style={{
                margin: "5rem 2rem",
                lineHeight: "1.75rem"
            }}>
            </main>

            {/* Render Posts */}
            <PostProvider>
                <Route exact path="/posts">
                    <PostList/>
                </Route>

                <Route exact path="/myposts">
                    <MyPostList/>
                </Route>
            </PostProvider>
        </>
    )
}
