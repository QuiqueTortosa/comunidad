import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createDiscussion, deleteDiscussion, getDiscussions, updateDiscussion, getCategories, deleteCategory, createCategory, getDiscussionMessages } from "../../store/actions";
import * as FaIcons from "react-icons/fa";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import "./forum.css"
import AñadirVotacion from "./AñadirVotacion";

const editorConfiguration = {
  toolbar: [ 'heading','bold', 'italic', 'link', 'toggleImageCaption', 'imageTextAlternative', 'uploadImage', 'undo', 'redo' ],
  ckfinder: {
    uploadUrl: 'http://localhost:4000/uploads'
  }
};

export default function CreateDiscussion() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [update, setUpdate] = useState(false)
  const currentDiscusion = useSelector(state => state.DISCUSSIONS.filter(d => d._id == "626eda0ab4f03212a09affda"))[0]
  const categories = useSelector(state => state.CATEGORIES)

  const [openPoll, setOpenPoll] = useState(false)
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", ""]);

  const [newDiscussion, setNewDiscussion] = useState({
    title: "",
    body: "",
    category: "",
  })

  const [newCategory, setNewCategory] = useState("")

  const addOption = () => {
    setOptions([...options, ""]);//Añadimos un elemento al array
  }

  const handleAnswer = (e, i) => {
    setOptions(o => {
      return [
          ...o.slice(0,i), //El slice devuelve parte de un array
          o[i] = e.target.value,
          ...o.slice(i+1)
      ]
      })
    };


  const handleCategory = (e) => {
    e.preventDefault()
    dispatch(createCategory(newCategory))
    dispatch(getCategories())
  }

  const handleUpdate = () => {
    console.log(currentDiscusion)
    setNewDiscussion({
      title: currentDiscusion.title,
      body: currentDiscusion.body
    })
    setUpdate(!update)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    //console.log(newDiscussion)
    //console.log(question)
    //console.log(options)
    if(update){
      //dispatch(updateDiscussion("626eda0ab4f03212a09affda", newDiscussion))
      //dispatch(getDiscussions())
    }else {
      dispatch(createDiscussion({...newDiscussion, poll: {
        question,
        options
      }}))
      dispatch(getDiscussions())
    }
  }

  return (
    <div className="my-14 mx-16">
<       link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.6.1/css/font-awesome.min.css" rel="stylesheet" />
        <form autoComplete="off" onSubmit={handleCategory}>
          <div className="relative z-0 mt-3 mb-3 w-full group pr-5">
            <input type="text" value={newCategory} onChange={(e) => setNewCategory(e.target.value)} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " /> 
            <label className="absolute left-0 text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Nombre</label>
          </div>
          <button className="bg-blue-900 text-white px-4  py-1 rounded shadow-md focus:ring hover:bg-blue-500 transition-all  active:transform active:translate-y-1" type="submit">
            Guardar Categoria
          </button>
        </form>
        <form autoComplete="off" onSubmit={handleSubmit}> 
          <div className="flex flex-col">
            <div className="relative z-0 mt-3 mb-3 w-full group pr-5">
              <input type="text" value={newDiscussion.title} onChange={(e) => setNewDiscussion({ ...newDiscussion, title: e.target.value })} className="block py-2.5 px-0 w-[400px] text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " /> 
              <label className="absolute left-0 text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Título</label>
            </div>
            <div className="relative z-0 mt-3 mb-3 w-full group pr-5">
            <select defaultValue="" onChange={(e) => setNewDiscussion({...newDiscussion, category: e.target.value})} class="select select-accent block w-48 px-3 py-1 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition  ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none">              
              <option disabled selected>Elija una categoría</option>
              { categories.map(c => (
                  <option>{c.name}</option>
                ))
                }
            </select>

            </div>
            <div className="relative z-0 mb-3 w-full group">
              <CKEditor
                editor={ ClassicEditor }
                config={ editorConfiguration }
                data={ newDiscussion.body }
                onChange={ ( e, editor ) => {
                        const data = editor.getData();
                        console.log( { e, editor, data } );
                        setNewDiscussion({ ...newDiscussion, body: data})
                           // if(editar) setNewDiscussion({...newDiscussion, body: data})
                        } }
                    />
            </div>
          </div>
          <div className="">
            <button className="bg-blue-900 text-white px-4  py-1 rounded shadow-md focus:ring hover:bg-blue-500 transition-all  active:transform active:translate-y-1" type="submit">
                {update ? "Actualizar" : "Guardar"}
            </button>
            <button onClick={() => setOpenPoll(!openPoll)} className="bg-blue-900 text-white px-4  py-1 ml-3 rounded shadow-md focus:ring hover:bg-blue-500 transition-all  active:transform active:translate-y-1" type="button">
                {!openPoll ? "Añadir votación" : "Eliminar votación"}
            </button>
          </div>
        </form>
        {openPoll && <AñadirVotacion options={options} question={question} setOptions={setOptions} setQuestion={setQuestion} setOpenPoll={setOpenPoll}/>}
    </div>
  )
}
