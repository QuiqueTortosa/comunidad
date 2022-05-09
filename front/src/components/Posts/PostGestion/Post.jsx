import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {  deletePost } from "../../../store/actions";

export default function Post({p, update, setUpdate,setPostData,setId}) {
    const dispatch = useDispatch()
    const [confirmDelete, setConfirmDelete] = useState(false)

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
      const handleUpdate = (p) => {
        setId(p._id)
        setPostData({
          title: p.title,
          post: p.post,
          selectedFile: p.selectedFile,
        })
        setUpdate(true)
      }
    return (
        <div key={p._id} className="rounded-lg w-[300px] h-auto overflow-hidden shadow-md bg-gray-800 border-gray-700 mb-8 xl:overflow-visible xl:min-w-[300px] xl:max-w-[300px] xl:flex xl:flex-col xl:justify-between">
            <div className="w-full h-2/5">
            <img className="w-full h-full max-h-48 xl:rounded-t-lg" src={p.selectedFile} alt="Mountain"/>
            </div>
            <div className="p-5">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{p.title}</h5>
            <div className="mb-3 font-normal text-gray-700 dark:text-gray-400 break-words" dangerouslySetInnerHTML={{__html:`${txt(p.post).substring(0,100)}...`}} />  
            </div>
            <div className="flex justify-between px-5 pb-5">
            <button onClick={() => handleUpdate(p)} className="bg-blue-900 text-white px-4  py-1 rounded shadow-md focus:ring hover:bg-blue-500 transition-all  active:transform active:translate-y-1">
                Editar
            </button>
            <button onClick={() => { setConfirmDelete(true) }} className="bg-red-600 text-white px-4  py-2 rounded shadow-md focus:ring hover:bg-red-500 transition-all  active:transform active:translate-y-1">
                Eliminar
            </button>
           </div>
           { confirmDelete &&
            <div className="bg-opacity-70 bg-gray-800 fixed inset-0 z-30">
            <div className="flex h-screen justify-center items-center ">
                <div className="flex-col justify-center  bg-white py-12 px-12 border-4 border-sky-900 rounded-xl items-center">
                <p className="text-black">¿Estas seguro de eliminar la noticia?</p>
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
