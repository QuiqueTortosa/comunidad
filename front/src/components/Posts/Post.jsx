import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getPosts, deletePost, getPostsBySearch } from "../../store/actions";
import PostMessage from "./PostMessage";

export default function Post() {
  const dispatch = useDispatch()

  const { postId } = useParams();
  const post = useSelector((state) => state.POSTS.filter(p => p._id == postId))[0];
  console.log(post)


  return (
    <div className="my-6">
      Hola
      <h1>{post.title}</h1>
      <p>{post.post}</p>
      <div>
        <h1>Mensajes</h1>
        {
          post.messages.map(m => (
            <p>{m.message}</p>
          ))
        }
      </div>
      <PostMessage />
    </div>
  )
}
