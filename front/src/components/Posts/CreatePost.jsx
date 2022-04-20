import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPost, createPost } from "../../store/actions";

export default function CreatePost() {
    const dispatch = useDispatch()
    const [postData, setPostData] = useState({
        title: "",
        post: "",
        selectedFile: "",
    })

    const handleSubmit = (e) => {
        console.log(postData)
        e.preventDefault()
        dispatch(createPost(postData))
    }
    
  return (
    <div>
    <form autocomplete="off" onSubmit={handleSubmit}> 
      <div className="relative z-0 mb-6 w-full group">
         <input type="text" onChange={(e) => setPostData({ ...postData, title: e.target.value })} name="floating_title" id="floating_title" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required /> 
         <label className="absolute left-0 text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Título</label>
      </div>
      <div className="relative z-0 mb-6 w-full group">
      <input type="text" onChange={(e) => setPostData({ ...postData, post: e.target.value })} name="floating_post" id="floating_post" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required /> 
         <label className="absolute left-0 text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Contenido</label>
      </div>
      <div className="flex flex-row gap-5">
        <button className="bg-blue-900 text-white px-4  py-1 rounded shadow-md focus:ring hover:bg-blue-500 transition-all  active:transform active:translate-y-1" type="submit">
          Submit
        </button>
      </div>
    </form>
    </div>
  )
}
