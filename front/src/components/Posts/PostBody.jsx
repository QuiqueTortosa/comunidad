import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deletePost, getMessages } from "../../store/actions";
import cookie from "js-cookie";
import decode from 'jwt-decode';

export default function PostBody({p}) {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [confirmDelete, setConfirmDelete] = useState(false)
    const isAdmin = decode(cookie.get("token")).roles.some(r => r.name == "admin")
  
    const handleRemove = (id) => {
      setConfirmDelete(false)
      dispatch(deletePost(id));
    };

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
    <div className="lg:max-w-[250px] lg:h-[400px] xl:w-[350px] flex flex-col justify-between rounded-lg w-[450px] overflow-hidden shadow-md bg-gray-800 border-gray-700 mb-8">
        <img className="w-full h-3/6 max-h-[240px] lg:max-h-[170px]" src={p.selectedFile} alt="Mountain"/>
        <div className="flex flex-col h-3/6 justify-between p-5 lg:pt-0">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{p.title}</h5>
            <div className="mb-3 font-normal text-gray-700 dark:text-gray-400 break-words lg:hidden" dangerouslySetInnerHTML={{__html:`${txt(p.post).substring(0,200)}...`}} /> 
            <div className="mb-3 font-normal text-gray-700 dark:text-gray-400 break-words hidden lg:flex" dangerouslySetInnerHTML={{__html:`${txt(p.post).substring(0,50)}...`}} />   
            <div className="flex justify-between">
            <button onClick={() => handleSelect(p._id)} className="bg-blue-900 text-white px-4  py-1 rounded shadow-md focus:ring hover:bg-blue-500 transition-all  active:transform active:translate-y-1">
                Leer mas...
                </button>
                { isAdmin &&
                <button onClick={() => { setConfirmDelete(true) }} className="lg:py-1 bg-red-600 text-white px-4  py-2 rounded shadow-md focus:ring hover:bg-red-500 transition-all  active:transform active:translate-y-1">
                Remove
                </button>
                }
            </div>
        </div>
        { confirmDelete &&
            <div className="bg-opacity-70 bg-gray-800 fixed inset-0 z-30">
            <div className="flex h-screen justify-center items-center ">
                <div className="flex-col justify-center  bg-white py-12 px-12 border-4 border-sky-900 rounded-xl items-center">
                <p className="text-black">¿Estas seguro de eliminar la noticía?</p>
                <div className="flex justify-evenly mt-4">
                <button onClick={() =>  handleRemove(p._id)} className="bg-red-600 text-white px-4  py-2 rounded shadow-md focus:ring hover:bg-red-500 transition-all  active:transform active:translate-y-1">
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
