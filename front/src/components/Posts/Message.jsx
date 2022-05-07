import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteMessage, getMessages } from "../../store/actions";
import decode from 'jwt-decode';
import cookie from "js-cookie";
import * as FaIcons from "react-icons/fa";
import "./post.css"
export default function Message({m, setReply,setUpdateMessage, editar, setEditar, updateMessage}) {
    const dispatch = useDispatch()
    const { postId } = useParams();
    const user = useSelector(state => state.auth.user)
    const [confirmDelete, setConfirmDelete] = useState(false)
    const isAdmin = useSelector(state=>state.auth.user.roles.find(r => r.name == "admin") ? true : false)
    const isMod = useSelector(state=>state.auth.user.roles.find(r => r.name == "moderator") ? true : false)
    const handleRemove = (id) => {
        setConfirmDelete(false)
        setUpdateMessage({...updateMessage, id: null})
        dispatch(deleteMessage(postId, id))
      }
  return (
    <div className="flex justify-between my-2 space-x-14 border-2 rounded-xl p-5 lg:space-x-2 sm:flex-col sm:items-center sm:gap-3">
    { m.user ? 
    <>              
      <div className={`flex flex-col justify-between items-center w-24 sm:pb-2 sm:w-full sm:border-b-2 sm: border-gray-300`}>
        <div className=" flex justify-center justify-items-center w-[93px]">
        <p className="relative text-xs text-gray-700">{m.createdAt.substring(0,10)+"," +m.createdAt.substring(11,16)}</p>
        </div>
        { user.email == m.user.email ?
          <div>
            {  m.user.selectedFile ? 
              <img className={`rounded-full w-16 h-16 my-2`} src={user.selectedFile != "" ? user.selectedFile : "/images/avatar.png"} alt={"Image not found"}></img>
              :
              <img className={`rounded-full w-16 h-16 my-2`} src={user.selectedFile != "" ? user.selectedFile : "/images/avatar.png"} alt={"Image not found"}></img>
              }
            </div>
            :
            <div>
              { m.user.selectedFile ? 
            <img className={`rounded-full w-16 h-16 my-2`} src="/images/avatar.png" alt={"Image not found"}></img>
                :
            <img className={`rounded-full w-16 h-16 my-2`} src="/images/avatar.png" alt={"Image not found"}></img>
          }
            </div>

        }
        <p>{m.user.username}</p>
      </div> 
    <div className={`flex flex-col text-center ${m.response.length == 0 ? "justify-center" : "justify-between"} sm:pb-2 sm:w-full sm:border-b-2 sm: border-gray-300`}>
      { m.response.length != 0 &&
        <div className="bg-gray-200 rounded-lg px-3 py-2 break-all"  dangerouslySetInnerHTML={{__html: m.response}}/>
        }
        <div className="break-all text-center" dangerouslySetInnerHTML={{ __html: m.message}}/>
    </div>
    { decode(cookie.get("token")).id == m.user._id || isAdmin || isMod ?
        <div className="flex flex-col gap-2 justify-between text-center items-center sm:flex-row sm:gap-4 sm:mt-1">
          <button className="flex bg-blue-900 text-white w-10 h-10 text-center justify-center  items-center  px-4  py-2 rounded-full shadow-md focus:ring hover:bg-blue-500 transition-all  active:transform active:translate-y-1" onClick={() => {setReply(m)}}><div><FaIcons.FaReply/></div></button>
          <button className="flex bg-red-600 text-white w-10 h-10 text-center justify-center  items-center px-2 py-2 rounded-full shadow-md focus:ring hover:bg-red-500 transition-all  active:transform active:translate-y-1" onClick={() => {setConfirmDelete(true)}}><FaIcons.FaTrash/></button>
          <button className="flex bg-blue-900 text-white w-10 h-10 text-center justify-center  items-center px-2 py-2 rounded-full shadow-md focus:ring hover:bg-blue-500 transit2on-all  active:transform active:translate-y-1" onClick={() => {setUpdateMessage({id: m._id, body: m.message}); setEditar(!editar)}}><FaIcons.FaEdit/></button>
        </div>   
        :
        <div className="flex flex-col justify-end items-center">
          <button className="flex bg-blue-900 text-white w-10 h-10 text-center justify-center  items-center  px-4  py-2 rounded-full shadow-md focus:ring hover:bg-blue-500 transition-all  active:transform active:translate-y-1" onClick={() => {setReply(m)}}><div><FaIcons.FaReply/></div></button>
        </div>               
        }
      </>
      :
      <>
        <div className={`flex flex-col justify-between items-center w-24 sm:pb-2 sm:w-full sm:border-b-2 sm: border-gray-300`}>
          <div className=" flex justify-center justify-items-center w-[93px]">
           <p className="relative text-xs text-gray-700">{m.createdAt.substring(0,10)+"," +m.createdAt.substring(11,16)}</p>
          </div>
          <img className="rounded-full w-16 h-16 my-2" src="/images/avatar.png"></img>
          <p className="text-xs text-gray-700">Usuario eliminado</p>
      </div> 
    <div className={`flex flex-col text-center ${m.response.length == 0 ? "justify-center" : "justify-between"} sm:pb-2 sm:w-full sm:border-b-2 sm: border-gray-300`}>
      { m.response.length != 0 &&
        <div className="bg-gray-200 rounded-lg px-3 py-2 break-all"  dangerouslySetInnerHTML={{__html: m.response}}/>
        }
        <div className="break-all text-center" dangerouslySetInnerHTML={{ __html: m.message}}/>
    </div>
    { isAdmin || isMod ?
        <div className="flex flex-col gap-2 justify-between text-center items-center sm:flex-row sm:gap-4 sm:mt-1">
          <button className="flex bg-blue-900 text-white w-10 h-10 text-center justify-center  items-center  px-4  py-2 rounded-full shadow-md focus:ring hover:bg-blue-500 transition-all  active:transform active:translate-y-1" onClick={() => {setReply(m)}}><div><FaIcons.FaReply/></div></button>
          <button className="flex bg-red-600 text-white w-10 h-10 text-center justify-center  items-center px-2 py-2 rounded-full shadow-md focus:ring hover:bg-red-500 transition-all  active:transform active:translate-y-1" onClick={() => {setConfirmDelete(true)}}><FaIcons.FaTrash/></button>
        </div>   
        :
        <div className="flex flex-col justify-end items-center">
          <button className="flex bg-blue-900 text-white w-10 h-10 text-center justify-center  items-center  px-4  py-2 rounded-full shadow-md focus:ring hover:bg-blue-500 transition-all  active:transform active:translate-y-1" onClick={() => {setReply(m)}}><div><FaIcons.FaReply/></div></button>
        </div>               
        }                
    </>
    }
    { confirmDelete &&
      <div className="bg-opacity-70 bg-gray-800 fixed inset-0 z-30">
        <div className="flex h-screen justify-center items-center ">
          <div className="flex-col justify-center  bg-white py-12 px-12 border-4 border-sky-900 rounded-xl items-center">
          <p className="text-black">¿Estas seguro de eliminar la votación?</p>
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
