import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getPosts, deletePost, getPostsBySearch, deleteMessage, setReplyMessage, getMessages } from "../../store/actions";
import PostMessage from "./PostMessage";

export default function Post() {
  const dispatch = useDispatch()
  const messages = useSelector((state) => state.MESSAGES);
  const user = useSelector(state => state.auth.user)
  const [reply, setReply] = useState({})
  console.log(messages)
  const { postId } = useParams();
  const post = useSelector((state) => state.POSTS.filter(p => p._id == postId))[0];
  useEffect(() => {
    dispatch(getMessages(postId))
  },[messages.length])
  console.log(post)
  const handleRemove = (id) => {
    dispatch(deleteMessage(postId, id))
  }
  console.log(reply)


  return (
    <div className="my-61">
      Hola
      <h1>{post.title}</h1>
      <p>{post.post}</p>
      <div className="flex flex-col w-auto shadow-3xl mx-16 mt-8 p-16 rounded-xl">
        <div className="flex justify-between">
          <h1>Mensajes</h1>
          <button className="bg-green-800 text-white px-4 py-1 mr-7 rounded shadow-md focus:ring hover:bg-green-600 transition-all  active:transform active:translate-y-1" onClick={() => {dispatch(getMessages(postId))}}>
            Refresh
          </button>
        </div>
        { 
          messages.map(m => (
            <div className="flex my-2 justify-between space-x-14 border-2 rounded-xl p-5">
              <div className={`flex flex-col items-center`}>
                <p className="relative text-xs text-gray-700">{m.createdAt.substring(0,10)+"," +m.createdAt.substring(11,16)}</p>
                { user.email == m.user.email ?
                     <img className={`rounded-full w-16 h-16 my-2`} src={user.selectedFile != "" ? user.selectedFile : "/images/avatar.png"} alt={"Image not found"}></img>
                      :
                    <img className={`rounded-full w-16 h-16 my-2`} src={m.user.selectedFile != "" ? m.user.selectedFile : "/images/avatar.png"} alt={"Image not found"}></img>
                }
                <p>{m.user.username}</p>
              </div> 
             <div className={`flex flex-col text-center ${m.response.length == 0 ? "justify-center" : "justify-between"}`}>
              { m.response.length != 0 &&
                <div className="bg-gray-100 rounded-lg">
                  <p className="px-3 py-2 break-all">{m.response}</p>
                </div>
                }
                <div>
                <p className="break-all text-center">{m.message}</p>
                </div>
             </div>
             <div className="flex flex-col">
              <button className="mx-4" onClick={() => {handleRemove(m._id)}}>Eliminar</button>
              <button className="mx-4" onClick={() => {setReply(m)}}>Citar</button>
             </div>
            </div>
          ))
        }
        <PostMessage reply={reply} setReply={setReply}/>
      </div>
    </div>
  )
}
