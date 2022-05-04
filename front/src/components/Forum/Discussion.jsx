import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteDiscussionMessage, getDiscussionMessages, getDiscussions } from "../../store/actions";
import decode from 'jwt-decode';
import cookie from "js-cookie";
import * as FaIcons from "react-icons/fa";
import DiscussionMessage from "./DiscussionMessage";
import "./forum.css"
import DiscussionHeader from "./DiscussionHeader";

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
  },[messages.length,updateMessage.id, updateMessage.id != null ? messages.find(m => m._id==updateMessage.id).user.selectedFile : updateMessage])
//discussion.user.username,discussion.poll.voted.length
  const handleRemove = (id) => {
    setUpdateMessage({...updateMessage, id: null})
    dispatch(deleteDiscussionMessage(discId, id))
  }


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
            <div className="flex my-2 border-2  rounded-xl lg:space-x-2 sm:flex-col sm:items-center sm:rounded-t-xl sm:gap-3">
              { m.user ? 
              <>              
                <div className={`flex flex-col items-center justify-between w-auto min-w-[130px] max-w-[130px] min-h-[350px] bg-gray-700 px-2 pt-3 rounded-l-xl sm:rounded-t-xl sm:rounded-b-none sm:max-w-full sm:pb-2 sm:w-full sm:border-b-2 sm:border-gray-300`}>
                  <div className="text-center">
                    { user.email == m.user.email ?
                      <div>
                        {  m.user.selectedFile ? 
                          <img className={`rounded-full w-28 h-28 my-2`} src={user.selectedFile != "" ? user.selectedFile : "/images/avatar.png"} alt={"Image not found"}></img>
                          :
                          <img className={`rounded-full w-28 h-28 my-2`} src={user.selectedFile != "" ? user.selectedFile : "/images/avatar.png"} alt={"Image not found"}></img>
                          }
                        </div>
                        :
                        <div>
                          { m.user.selectedFile ? 
                        <img className={`rounded-full w-28 h-28 my-2`} src="/images/avatar.png" alt={"Image not found"}></img>
                            :
                        <img className={`rounded-full w-28 h-28 my-2`} src="/images/avatar.png" alt={"Image not found"}></img>
                      }
                        </div>

                    }
                    <p className="text-gray-200">{m.user.username}</p>
                    <p className="text-xl font-bold italic font-extrabold text-gray-200">{m.user.roles ? m.user.roles[m.user.roles.length-1].name : "nada"}</p>
                    <div className="flex justify-center">
                      <p className="text-gray-300">Mensajes: &nbsp;</p>
                      <p className="text-gray-200">{m.user.roles ? m.user.forumMessages.length : 0}</p>
                    </div>
                  </div>
                  <div className="pb-3">
                    <p className="relative text-xs text-gray-200">{m.user.createdAt ? m.user.createdAt.substring(0,10)+"," +m.user.createdAt.substring(11,16) : ""}</p>
                  </div>
                </div> 
                <div className={`flex flex-col text-center w-full min-h-[350px] h-full justify-between px-8 sm:pb-2 sm:w-full sm:border-b-2 sm: border-gray-300`}>
                  <div className="text-right pt-2">
                    <p className="relative text-xs text-gray-700">{m.createdAt.substring(0,10)+"," +m.createdAt.substring(11,16)}</p>
                  </div>
                  <div id="texto" className="text-center">
                    { m.response != null  &&
                      <div className="bg-gray-200 rounded-lg px-3 py-2 break-all">
                        <p className="text-gray-700 text-sm text-left">Respuesta a {m.response.user ? m.response.user.username : ""}:</p>
                        <div className="text-gray-900 text-sm"  dangerouslySetInnerHTML={{__html: m.response.message}}/>
                      </div>
                      }
                      <div className="break-all" dangerouslySetInnerHTML={{ __html: m.message}}/>
                  </div>
                  { decode(cookie.get("token")).id == m.user._id || isAdmin || isMod ?
                    <div className="flex flex-row gap-2 justify-end text-center items-center py-2 sm:flex-row sm:gap-4 sm:mt-1">
                      <button className="flex bg-blue-900 text-white w-10 h-10 text-center justify-center items-center py-2 rounded-full shadow-md focus:ring hover:bg-blue-500 transition-all  active:transform active:translate-y-1" onClick={() => {setReply(m)}}><div><FaIcons.FaReply/></div></button>
                      <button className="flex bg-red-600 text-white w-10 h-10 text-center justify-center items-center py-2 rounded-full shadow-md focus:ring hover:bg-red-500 transition-all  active:transform active:translate-y-1" onClick={() => {handleRemove(m._id)}}><FaIcons.FaTrash/></button>
                      <button className="flex bg-blue-900 text-white w-10 h-10 text-center justify-center items-center py-2 rounded-full shadow-md focus:ring hover:bg-blue-500 transit2on-all  active:transform active:translate-y-1" onClick={() => {setUpdateMessage({id: m._id, body: m.message}); setEditar(!editar)}}><FaIcons.FaEdit/></button>
                    </div>   
                    :
                    <div className="flex flex-col justify-end items-center p-2">
                      <button className="flex bg-blue-900 text-white w-10 h-10 text-center justify-center  items-center py-2 rounded-full shadow-md focus:ring hover:bg-blue-500 transition-all  active:transform active:translate-y-1" onClick={() => {setReply(m)}}><div><FaIcons.FaReply/></div></button>
                    </div>               
                  }
                </div>
                </>
                :
                <>
                  <div className={`flex flex-col justify-between items-center w-24 sm:pb-2 sm:w-full sm:border-b-2 sm:rounded-t-xl sm:rounded-b-none border-gray-300`}>
                    <div className=" flex justify-center justify-items-center w-[93px]">
                     <p className="relative text-xs text-gray-700">{m.createdAt.substring(0,10)+"," +m.createdAt.substring(11,16)}</p>
                    </div>
                    <img className="rounded-full w-16 h-16 my-2" src="/images/avatar.png"></img>
                    <p className="text-xs text-gray-700">Usuario eliminado</p>
                </div> 
                <div className={`flex flex-col text-center ${m.response.length == 0 ? "justify-center" : "justify-between"} sm:pb-2 sm:w-full sm:border-b-2 sm: border-gray-300`}>
                  { m.response.length != 0 &&
                    <div className="bg-gray-200 rounded-lg px-3 py-2 break-all"  dangerouslySetInnerHTML={{__html: m.response.message}}/>
                    }
                    <div className="break-all text-center" dangerouslySetInnerHTML={{ __html: m.message}}/>
                </div>
                { isAdmin || isMod ?
                    <div className="flex flex-col gap-2 justify-between text-center items-center sm:flex-row sm:gap-4 sm:mt-1">
                      <button className="flex bg-blue-900 text-white w-10 h-10 text-center justify-center  items-center  px-4  py-2 rounded-full shadow-md focus:ring hover:bg-blue-500 transition-all  active:transform active:translate-y-1" onClick={() => {setReply(m)}}><div><FaIcons.FaReply/></div></button>
                      <button className="flex bg-red-600 text-white w-10 h-10 text-center justify-center  items-center px-2 py-2 rounded-full shadow-md focus:ring hover:bg-red-500 transition-all  active:transform active:translate-y-1" onClick={() => {handleRemove(m._id)}}><FaIcons.FaTrash/></button>
                    </div>   
                    :
                    <div className="flex flex-col justify-end items-center">
                      <button className="flex bg-blue-900 text-white w-10 h-10 text-center justify-center  items-center  px-4  py-2 rounded-full shadow-md focus:ring hover:bg-blue-500 transition-all  active:transform active:translate-y-1" onClick={() => {setReply(m)}}><div><FaIcons.FaReply/></div></button>
                    </div>               
                    }                
              </>
              }
            </div>
          ))
        }
        <DiscussionMessage reply={reply} setReply={setReply} messageUpdate={updateMessage} setUpdateMessage={setUpdateMessage} editar={editar} setEditar={setEditar}/>
      </div>
    </div>
  )
}
/**
 *               { decode(cookie.get("token")).id == m.user._id || isAdmin || isMod ?
                  <div className="flex flex-col gap-2 justify-between text-center items-center sm:flex-row sm:gap-4 sm:mt-1">
                    <button className="flex bg-blue-900 text-white w-10 h-10 text-center justify-center  items-center  px-4  py-2 rounded-full shadow-md focus:ring hover:bg-blue-500 transition-all  active:transform active:translate-y-1" onClick={() => {setReply(m)}}><div><FaIcons.FaReply/></div></button>
                    <button className="flex bg-red-600 text-white w-10 h-10 text-center justify-center  items-center px-2 py-2 rounded-full shadow-md focus:ring hover:bg-red-500 transition-all  active:transform active:translate-y-1" onClick={() => {handleRemove(m._id)}}><FaIcons.FaTrash/></button>
                    <button className="flex bg-blue-900 text-white w-10 h-10 text-center justify-center  items-center px-2 py-2 rounded-full shadow-md focus:ring hover:bg-blue-500 transit2on-all  active:transform active:translate-y-1" onClick={() => {setUpdateMessage({id: m._id, body: m.message}); setEditar(!editar)}}><FaIcons.FaEdit/></button>
                  </div>   
                  :
                  <div className="flex flex-col justify-end items-center">
                    <button className="flex bg-blue-900 text-white w-10 h-10 text-center justify-center  items-center  px-4  py-2 rounded-full shadow-md focus:ring hover:bg-blue-500 transition-all  active:transform active:translate-y-1" onClick={() => {setReply(m)}}><div><FaIcons.FaReply/></div></button>
                  </div>               
                  }
 */