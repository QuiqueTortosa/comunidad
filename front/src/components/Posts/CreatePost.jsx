import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createPost, getPosts, deletePost, getPostsBySearch, updatePost } from "../../store/actions";
import FileBase from 'react-file-base64'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { FaSearch } from 'react-icons/fa';


const editorConfiguration = {
    toolbar: [ 'heading','bold', 'italic', 'bulletedList', 'numberedList', 'blockQuote', 'insertTable', 'uploadImage','undo', 'redo' ]
};

export default function CreatePost() {
    const dispatch = useDispatch()
    const posts = useSelector((state) => state.POSTS);
    console.log(posts)
    const [search, setSearch] = useState('')
    const [postData, setPostData] = useState({
        title: "",
        post: "",
        selectedFile: "",
    })
    const [id, setId] = useState("")
    const [update, setUpdate] = useState(false)


    useEffect(() => {
      setPostData({...postData})
    },[postData.selectedFile, postData.post, postData.title])

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
      console.log("update")
      setId(p._id)
      setPostData({
        title: p.title,
        post: p.post,
        selectedFile: p.selectedFile,
      })
      setUpdate(true)
    }

    const handleSubmit = (e) => {
      e.preventDefault()
      console.log(postData)
      console.log(id)
      if(update) {
        console.log("hola")
        dispatch(updatePost(id, postData))
        clear()
      }else {
        dispatch(createPost(postData))
        clear()
      }
    }

    const clear = () => {
      setPostData({
        title: "",
        post: "",
        selectedFile: "",
    })
    }

  return (
    <div className="flex flex-row pl-5 justify-evenly xl:flex-col">
      <div className="pr-10">
        <form autoComplete="off" onSubmit={handleSubmit}> 
          { postData.selectedFile.length > 2 ?
          <div className="">
          <h1 className="pb-3 text-3xl font-bold italic font-extrabold">Gestión de noticias</h1>
          <div className="flex justify-items-center justify-center">
            <img className="w-[250px] h-[170px] rounded-lg" src={postData.selectedFile} alt="nada"></img>
          </div>
        </div>
          :
          <div className="">
            <h1 className="pb-3 text-3xl font-bold italic font-extrabold">Gestión de noticias</h1>
            <div className="flex justify-items-center justify-center">
              <img className="w-[250px] h-[170px] rounded-lg" src={"images/sin-imagen.jpg"} alt="nada"></img>
            </div>
          </div>
          }
          <div className="flex flex-row">
            <div className="relative z-0 mt-3 mb-3 w-full group pr-5">
              <input type="text" value={postData.title} onChange={(e) => setPostData({ ...postData, title: e.target.value })} name="floating_title" id="floating_title" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " /> 
              <label className="absolute left-0 text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Título</label>
            </div>
            <div className="flex py-3 justify-items-center justify-center">
            <FileBase
              type="file"
              multiple={false} //Solo permite un archivo
              onDone={({base64}) => setPostData({...postData, selectedFile: base64})}
            />
          </div>
          </div>
          <div className="h-[40vh] max-h-[40vh] w-[600px] overflow-y-auto xl:w-full">
          <CKEditor     
                        editor={ ClassicEditor }
                        config={ 
                          {
                            ckfinder: {
                              uploadUrl: 'http://localhost:4000/uploads'
                            }
                          }
                         }
                        data={postData.post}
                        onReady={ editor => {
                            // You can store the "editor" and use when it is needed.
                        } }
                        onChange={ ( e, editor ) => {
                            const data = editor.getData();
                            console.log( { e, editor, data } );
                            setPostData({ ...postData, post: data })
                        } }
                        onBlur={ ( event, editor ) => {
                        } }
                        onFocus={ ( event, editor ) => {
                        } }
                    />
          </div>
          <div className="mt-3">
            <button className="bg-blue-900 text-white px-4  py-1 rounded shadow-md focus:ring hover:bg-blue-500 transition-all  active:transform active:translate-y-1" type="submit">
              { update ? "Actualizar" : "Guardar"}
            </button>
          </div>
        </form>
      </div>
      <div className="hidden flex-row justify-end pr-1 w-[300px] pb-2 xl:w-auto xl:right-2 xl:flex">
            <div className="">
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
      <div className="h-[90vh] overflow-auto xl:mt-3 xl:h-auto">
        <div className="flex flex-row justify-end pr-1 w-[300px] pb-2 xl:hidden">
            <div className="">
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
          <div className="pr-4 xl:flex xl:flex-row xl:gap-7">
            {posts.map((p) => (
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
                <button onClick={() => { handleRemove(p._id) }} className="bg-red-600 text-white px-4  py-2 rounded shadow-md focus:ring hover:bg-red-500 transition-all  active:transform active:translate-y-1">
                  Remove
                </button>
              </div>
            </div>
            ))}
          </div>
      </div>
    </div>
  )
}
