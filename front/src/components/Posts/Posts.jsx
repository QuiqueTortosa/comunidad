import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getPosts, deletePost, getPostsBySearch, getMessages } from "../../store/actions";
import { FaSearch } from 'react-icons/fa';
import CreatePost from "./CreatePost";
import Post from "./Post";


export default function Posts() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const posts = useSelector((state) => state.POSTS);
  const [search, setSearch] = useState('')

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
        <div className="flex flex-row">
          <input 
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar..."
            >
          </input>
          <button 
            className="bg-blue-900 text-white px-4  py-1 rounded shadow-md focus:ring hover:bg-blue-500 transition-all  active:transform active:translate-y-1"
            onClick={searchPosts}>
            <FaSearch></FaSearch>
          </button>
        </div>
      <div>
        {posts.map((p) => (
          <div className="my-5">
          <button onClick={() => { handleRemove(p._id) }}>
             Remove
          </button>
          <button onClick={() => handleSelect(p._id)}>
            Ir
          </button>
          </div>
        ))}
      </div>
    </div>
  );
}
