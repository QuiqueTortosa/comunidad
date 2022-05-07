import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteDiscussionMessage, getDiscussionMessages, getDiscussions } from "../../../store/actions";
import decode from 'jwt-decode';
import cookie from "js-cookie";
import * as FaIcons from "react-icons/fa";
import DiscussionMessage from "./DiscussionMessage";
import "../forum.css"
import DiscussionHeader from "./DiscussionHeader";
import Message from "./Message";

export default function Discussion() {
  const dispatch = useDispatch()

  const isAdmin = useSelector(state=>state.auth.user.roles.find(r => r.name == "admin") ? true : false)
  const isMod = useSelector(state=>state.auth.user.roles.find(r => r.name == "moderator") ? true : false)

  const messages = useSelector((state) => state.DISCUSSION_MESSAGES);
  const user = useSelector(state => state.auth.user)
  const [updateMessage, setUpdateMessage] = useState({
    message: "",
    id: null
  })
  const [reply, setReply] = useState({})
  const [editar, setEditar] = useState(false)

  console.log(reply)
  const { discId } = useParams();
  const discussion = useSelector((state) => state.DISCUSSIONS.filter(p => p._id == discId))[0];
  console.log(discussion)
  useEffect(() => {
    dispatch(getDiscussionMessages(discId))
    dispatch(getDiscussions())
  },[messages.length,updateMessage.id])

  return (
    <div className="flex flex-col w-auto">
      <div className="flex flex-col w-auto mx-16 mt-8 py-16 bg-white lg:mx-1 lg:px-1 lg:shadow-none">
        <div className="flex justify-between">
          <h1 className="text-3xl font-bold italic">{discussion.title}</h1>
          <button className="bg-green-800 text-white px-4 py-1 mr-6 rounded shadow-md focus:ring hover:bg-green-600 transition-all  active:transform active:translate-y-1" onClick={() => {dispatch(getDiscussionMessages(discId))}}>
            Refrescar
          </button>
        </div>
        <DiscussionHeader discussion={discussion} reply={reply} setReply={setReply}/>
        { 
          messages.map(m => ( 
            <Message m={m} reply={reply} setReply={setReply} messageUpdate={updateMessage} updateMessage={updateMessage} setUpdateMessage={setUpdateMessage} editar={editar} setEditar={setEditar}/>
          ))
        }
        <DiscussionMessage reply={reply} setReply={setReply} messageUpdate={updateMessage} setUpdateMessage={setUpdateMessage} editar={editar} setEditar={setEditar}/>
      </div>
    </div>
  )
}
