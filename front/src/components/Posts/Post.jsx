import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteMessage, getMessages } from "../../store/actions";
import PostMessage from "./PostMessage";
import * as FaIcons from "react-icons/fa";
import "./post.css"
import Message from "./Message";

export default function Post() {
  const dispatch = useDispatch()
  const messages = useSelector((state) => state.MESSAGES);
  const [updateMessage, setUpdateMessage] = useState({
    body: "",
    id: null
  })
  const [reply, setReply] = useState({})
  const [editar, setEditar] = useState(false)

  console.log(updateMessage)
  const { postId } = useParams();
  const post = useSelector((state) => state.POSTS.filter(p => p._id == postId))[0];

  useEffect(() => {
    dispatch(getMessages(postId))
  },[messages.length,updateMessage.id, updateMessage.id != null ? messages.find(m => m._id==updateMessage.id).user.selectedFile : updateMessage])

  return (
    <div className="flex flex-col w-auto">
      <div className="mx-32 mt-4 lg:mx-1 lg:px-1">
        <div>
          <h1 className="text-3xl font-bold italic font-extrabold">{post.title}</h1>
        </div>
        <div className="my-5">
          <img className="w-4/6 max-w-[726px] max-h-[300px] h-2/6 rounded-lg lg:w-full" src={post.selectedFile} alt="Mountain"/>
        </div>
        <div id="body" className="w-full lg:w-full" dangerouslySetInnerHTML={{__html:`${post.post}`}} />  
      </div>
      <div className="flex flex-col w-auto shadow-3xl mx-16 mt-8 p-16 rounded-xl bg-white lg:mx-1 lg:px-1 lg:shadow-none">
        <div className="flex justify-between">
          <h1 className="text-3xl font-bold italic">Mensajes</h1>
          <button className="bg-green-800 text-white px-4 py-1 mr-6 rounded shadow-md focus:ring hover:bg-green-600 transition-all  active:transform active:translate-y-1" onClick={() => {dispatch(getMessages(postId))}}>
            Refrescar
          </button>
        </div>
        { 
          messages.map(m => ( 
            <Message m={m} reply={reply} setReply={setReply} messageUpdate={updateMessage} updateMessage={updateMessage} setUpdateMessage={setUpdateMessage} editar={editar} setEditar={setEditar}/>
          ))
        }
        <PostMessage reply={reply} setReply={setReply} messageUpdate={updateMessage} setUpdateMessage={setUpdateMessage} editar={editar} setEditar={setEditar}/>
      </div>
    </div>
  )
}
