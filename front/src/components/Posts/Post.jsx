import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteMessage, getMessages } from "../../store/actions";
import PostMessage from "./PostMessage";
import decode from 'jwt-decode';
import cookie from "js-cookie";


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
    <div className="flex flex-col w-auto">
      <div className="mx-16 mt-4">
        <div>
          <h1 className="text-3xl font-bold italic font-extrabold">{post.title}</h1>
        </div>
        <div className="my-5">
          <img className="w-4/6 h-2/6 rounded-lg" src={post.selectedFile} alt="Mountain"/>
        </div>
        <div dangerouslySetInnerHTML={{__html:`${post.post}`}} />  
      </div>
      <div className="flex flex-col w-auto shadow-3xl mx-16 mt-8 p-16 rounded-xl bg-white">
        <div className="flex justify-between">
          <h1 className="text-3xl font-bold italic">Mensajes</h1>
          <button className="bg-green-800 text-white px-4 py-1 mr-6 rounded shadow-md focus:ring hover:bg-green-600 transition-all  active:transform active:translate-y-1" onClick={() => {dispatch(getMessages(postId))}}>
            Refrescar
          </button>
        </div>
        { 
          messages.map(m => (
            <div className="flex justify-between my-2 space-x-14 border-2 rounded-xl p-5">
              <div className={`flex flex-col items-center justify-between w-24 `}>
                <div className=" flex justify-center justify-items-center w-[93px]">
                 <p className="relative text-xs text-gray-700">{m.createdAt.substring(0,10)+"," +m.createdAt.substring(11,16)}</p>
                </div>
                { user.email == m.user.email ?
                   <div>
                     <img className={`rounded-full w-16 h-16 my-2`} src={user.selectedFile != "" ? user.selectedFile : "/images/avatar.png"} alt={"Image not found"}></img>
                    </div>
                     :
                     <div>
                    <img className={`rounded-full w-16 h-16 my-2`} src={m.user.selectedFile != "" ? m.user.selectedFile : "/images/avatar.png"} alt={"Image not found"}></img>
                    </div>

                }
                <p>{m.user.username}</p>
              </div> 
             <div className={`flex flex-col text-center ${m.response.length == 0 ? "justify-center" : "justify-between"}`}>
              { m.response.length != 0 &&
                <div className="bg-gray-200 rounded-lg px-3 py-2 break-all"  dangerouslySetInnerHTML={{__html: m.response}}/>
                }
                <div className="break-all text-center" dangerouslySetInnerHTML={{ __html: m.message}}/>
             </div>
             { decode(cookie.get("token")).id == m.user._id ?
                <div className="flex flex-col justify-between">
                 <button className="bg-red-600 text-white px-4  py-2 rounded shadow-md focus:ring hover:bg-red-500 transition-all  active:transform active:translate-y-1" onClick={() => {handleRemove(m._id)}}>Eliminar</button>
                 <button className="bg-blue-900 text-white px-4  py-2 rounded shadow-md focus:ring hover:bg-blue-500 transition-all  active:transform active:translate-y-1" onClick={() => {setReply(m)}}>Citar</button>
                </div>   
                :
                <div className="flex flex-col justify-end">
                 <button className="bg-blue-900 text-white h-12 px-4 py-2 rounded shadow-md focus:ring hover:bg-blue-500 transition-all  active:transform active:translate-y-1" onClick={() => {setReply(m)}}>Citar</button>
                </div>               
                }
            </div>
          ))
        }
        <PostMessage reply={reply} setReply={setReply}/>
      </div>
    </div>
  )
}
