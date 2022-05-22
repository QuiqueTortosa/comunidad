import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getPosts, deletePost, getPostsBySearch, getMessages } from "../../store/actions";
import { FaSearch } from 'react-icons/fa';
import cookie from "js-cookie";
import decode from 'jwt-decode';
import PostBody from "./PostBody";


export default function Posts() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const posts = useSelector((state) => state.POSTS);
  const [search, setSearch] = useState('')
  const [confirmDelete, setConfirmDelete] = useState(false)
  const isAdmin = decode(cookie.get("token")).roles.some(r => r.name == "admin" || r.name == "moderator")

  const handleRemove = (id) => {
    setConfirmDelete(false)
    dispatch(deletePost(id));
  };

  const searchPosts = (query) => {
    if(search.trim()){
        dispatch(getPostsBySearch(search))
      }else {
        dispatch(getPosts())
      }
  }

  const txt = (p) => {
    if(p.substring(0,150).includes("img")){
      return p.substring(0,p.indexOf("<img")).concat(p.substring(p.indexOf('g">')+3, p.length))
    }else if(p.substring(0,150).includes("figure")){
      return p.substring(0,p.indexOf("<figure")).concat(p.substring(p.indexOf('re>')+3, p.length))
    }
    else {
      return p
    }
  }

  const handleSelect = (id) => {
    dispatch(getMessages(id));
    navigate(`/noticias/${id}`);
  };  

  return (
    <div>
      <div className="flex flex-row my-4 justify-between mx-7 sm:flex-col">
        <div className="sm:text-center">
          <h1 className="text-3xl font-bold italic font-extrabold">Noticias</h1>
        </div>
        <div className="mr-2 sm:text-center sm:mt-3 ">
          <input  
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar..."
            className="rounded p-1 sm:w-36"
          >
          </input>
          <button 
            className="bg-blue-900 text-white px-4 py-[8px] rounded shadow-md focus:ring hover:bg-blue-500 transition-all  active:transform active:translate-y-1"
            onClick={searchPosts}>
            <FaSearch></FaSearch>
          </button>
        </div>
    </div>
    <div className="grid grid-cols-2 justify-items-center sm:grid-cols-1">
      {posts.map((p) => (
        <PostBody p={p}/>
       ))}
      </div>
    </div>
  );
}
