import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteDiscussionMessage } from "../../../store/actions";
import decode from 'jwt-decode';
import cookie from "js-cookie";
import * as FaIcons from "react-icons/fa";
import "../forum.css"

export default function Message({m, setReply,setUpdateMessage, editar, setEditar, updateMessage}) {
    
    const dispatch = useDispatch()
    const { discId } = useParams();
    const user = useSelector(state => state.auth.user)
    const [confirmDelete, setConfirmDelete] = useState(false)
    const isAdmin = useSelector(state=>state.auth.user.roles.find(r => r.name == "admin") ? true : false)
    const isMod = useSelector(state=>state.auth.user.roles.find(r => r.name == "moderator") ? true : false)
    const handleRemove = (id) => {
        setConfirmDelete(false)
        setUpdateMessage({...updateMessage, id: null})
        dispatch(deleteDiscussionMessage(discId, id))
      }

  return (
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
                <button className="flex bg-red-600 text-white w-10 h-10 text-center justify-center items-center py-2 rounded-full shadow-md focus:ring hover:bg-red-500 transition-all  active:transform active:translate-y-1" onClick={() => {setConfirmDelete(true)}}><FaIcons.FaTrash/></button>
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
        <div className={`flex flex-col items-center justify-between w-auto min-w-[130px] max-w-[130px] min-h-[350px] bg-gray-700 px-2 pt-3 rounded-l-xl sm:rounded-t-xl sm:rounded-b-none sm:max-w-full sm:pb-2 sm:w-full sm:border-b-2 sm:border-gray-300`}>
            <div className="text-center">
            <img className={`rounded-full w-28 h-28 my-2`} src="/images/avatar.png" alt={"Image not found"}></img>
            <p className="text-gray-200 text-xs">Usuario eliminado</p>
            <p className="text-xl font-bold italic font-extrabold text-gray-200">Banned</p>
            <div className="flex justify-center">
                <p className="text-gray-300">Mensajes: &nbsp;</p>
                <p className="text-gray-200">0</p>
            </div>
            </div>
            <div className="pb-3">
            <p className="relative text-xs text-gray-200">Hace mucho tiempo</p>
            </div>
        </div> 
        <div className={`flex flex-col text-center w-full min-h-[350px] h-full justify-between px-8 sm:pb-2 sm:w-full sm:border-b-2 sm: border-gray-300`}>
            <div className="text-right pt-2">
            <p className="relative text-xs text-gray-700">{m.createdAt.substring(0,10)+"," +m.createdAt.substring(11,16)}</p>
            </div>
            <div id="texto" className="text-center">
            { m.response != null  &&
                <div className="bg-gray-200 rounded-lg px-3 py-2 break-all">
                <p className="text-gray-700 text-sm text-left">Respuesta a {m.response.user ? m.response.user.username : "banned"}:</p>
                <div className="text-gray-900 text-sm"  dangerouslySetInnerHTML={{__html: m.response.message}}/>
                </div>
                }
                <div className="break-all" dangerouslySetInnerHTML={{ __html: m.message}}/>
            </div>
            { isAdmin || isMod ?
            <div className="flex flex-row gap-2 justify-end text-center items-center py-2 sm:flex-row sm:gap-4 sm:mt-1">
                <button className="flex bg-blue-900 text-white w-10 h-10 text-center justify-center items-center py-2 rounded-full shadow-md focus:ring hover:bg-blue-500 transition-all  active:transform active:translate-y-1" onClick={() => {setReply(m)}}><div><FaIcons.FaReply/></div></button>
                <button className="flex bg-red-600 text-white w-10 h-10 text-center justify-center items-center py-2 rounded-full shadow-md focus:ring hover:bg-red-500 transition-all  active:transform active:translate-y-1" onClick={() => {setConfirmDelete(true)}}><FaIcons.FaTrash/></button>
                <button className="flex bg-blue-900 text-white w-10 h-10 text-center justify-center items-center py-2 rounded-full shadow-md focus:ring hover:bg-blue-500 transit2on-all  active:transform active:translate-y-1" onClick={() => {setUpdateMessage({id: m._id, body: m.message}); setEditar(!editar)}}><FaIcons.FaEdit/></button>
            </div>   
            :
            <div className="flex flex-col justify-end items-center p-2">
                <button className="flex bg-blue-900 text-white w-10 h-10 text-center justify-center  items-center py-2 rounded-full shadow-md focus:ring hover:bg-blue-500 transition-all  active:transform active:translate-y-1" onClick={() => {setReply(m)}}><div><FaIcons.FaReply/></div></button>
            </div>               
            }
        </div>
        </>
        }
        { confirmDelete &&
        <div className="bg-opacity-70 bg-gray-800 fixed inset-0 z-30">
            <div className="flex h-screen justify-center items-center ">
            <div className="flex-col justify-center  bg-white py-12 px-12 border-4 border-sky-900 rounded-xl items-center">
            <p className="text-black">¿Estas seguro de eliminar el mensaje?</p>
            <div className="flex justify-evenly mt-4">
                <button onClick={() =>  handleRemove(m._id)} className="bg-red-600 text-white px-4  py-2 rounded shadow-md focus:ring hover:bg-red-500 transition-all  active:transform active:translate-y-1">
                Eliminar
                </button>
                <button onClick={() => setConfirmDelete(false)} className="bg-blue-900 text-white px-4  py-2 rounded shadow-md focus:ring hover:bg-blue-500 transition-all  active:transform active:translate-y-1">
                Cancelar
                </button>
            </div>
            </div>
            </div>
      </div>
        }
  </div>
  )
}
