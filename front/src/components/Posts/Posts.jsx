import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getPosts, deletePost, getPostsBySearch, getMessages } from "../../store/actions";
import { FaSearch } from 'react-icons/fa';
import CreatePost from "./CreatePost";
import Post from "./Post";
import cookie from "js-cookie";
import decode from 'jwt-decode';


export default function Posts() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const posts = useSelector((state) => state.POSTS);
  const [search, setSearch] = useState('')
  const isAdmin = decode(cookie.get("token")).roles.some(r => r.name == "admin" || r.name == "moderator")
  console.log(posts);

  const handleRemove = (id) => {
    dispatch(deletePost(id));
  };

  const searchPosts = (query) => {
    if(search.trim()){
        console.log(search)
        dispatch(getPostsBySearch(search))
      }else {
        console.log("jeje")
        dispatch(getPosts())
      }
  }

  const handleSelect = (id) => {
    dispatch(getMessages(id));
    navigate(`/noticias/${id}`);
  };  

  return (
    <div>
      <div className="flex flex-row my-4 justify-between mx-7">
        <div>
          <h1 className="text-3xl font-bold italic font-extrabold">Noticias</h1>
        </div>
        <div className="mr-2">
          <input 
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar..."
            className="rounded p-1"
          >
          </input>
          <button 
            className="bg-blue-900 text-white px-4 py-[8px] rounded shadow-md focus:ring hover:bg-blue-500 transition-all  active:transform active:translate-y-1"
            onClick={searchPosts}>
            <FaSearch></FaSearch>
          </button>
        </div>
    </div>
    <div className="grid grid-cols-2 justify-items-center ">
      {posts.map((p) => (
       <div className="rounded-lg w-[450px] overflow-hidden border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700 mb-8">
       <img className="w-full h-3/6" src={p.selectedFile} alt="Mountain"/>
         <div className="flex flex-col h-3/6 justify-between p-5">
           <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{p.title}</h5>
           <div className="mb-3 font-normal text-gray-700 dark:text-gray-400 break-words" dangerouslySetInnerHTML={{__html:`${p.post.substring(0,150)}...`}} />  
           <div className="flex justify-between">
           <button onClick={() => handleSelect(p._id)} className="bg-blue-900 text-white px-4  py-1 rounded shadow-md focus:ring hover:bg-blue-500 transition-all  active:transform active:translate-y-1">
               Leer mas...
             </button>
             { isAdmin &&
               <button onClick={() => { handleRemove(p._id) }} className="bg-red-600 text-white px-4  py-2 rounded shadow-md focus:ring hover:bg-red-500 transition-all  active:transform active:translate-y-1">
               Remove
             </button>
               }
            </div>
         </div>
       </div>
       ))}
      </div>
    </div>
  );
}
