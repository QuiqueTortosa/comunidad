import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createDiscussion, deleteDiscussion, getDiscussions, updateDiscussion, getCategories, deleteCategory, createCategory, getDiscussionMessages, addError } from "../../store/actions";
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

export default function ActualizarDisc() {
  const dispatch = useDispatch()
  const discussions = useSelector(state => state.DISCUSSIONS)
  const categories = useSelector(state => state.CATEGORIES)

  const [openPoll, setOpenPoll] = useState(false)
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", ""]);
  const [_updateDiscussion, setUpdateDiscussion] = useState({
    id: "",
    title: "",
    body: "",
    category: "",
  })

  useEffect(() => {
    setUpdateDiscussion(_updateDiscussion)
  }, [_updateDiscussion.title])

  const handleSelectDiscussion = disc => {
      console.log(JSON.parse(disc))
     setUpdateDiscussion({
       id: JSON.parse(disc)._id,
       title: JSON.parse(disc).title,
       body: JSON.parse(disc).body,
       category: JSON.parse(disc).category
     })
     setQuestion(JSON.parse(disc).poll.question)
     //console.log(updateDiscussion)

   }

   const openModal = () => {
       if(_updateDiscussion.title.length == 0) {
        dispatch(addError(1,"Eligue una discusión"))
       }else if(question){
            if(question.length != 0)dispatch(addError(1,"La discusión ya tiene una votación"))
            else setOpenPoll(!openPoll)
       }else {
        setOpenPoll(!openPoll)
       }
   }

   const handleSubmit = (e) => {
    e.preventDefault()
    console.log(_updateDiscussion)
    dispatch(updateDiscussion(_updateDiscussion.id,{..._updateDiscussion, poll: {
      question,
      options
     }}))
     console.log(question)
     console.log(options)
    dispatch(getDiscussions())
  }

  return (
    <div>
        <form autoComplete="off" onSubmit={handleSubmit}> 
          <div className="flex flex-col">
            <select defaultValue="" required onChange={(e) => handleSelectDiscussion(e.target.value)} className="select select-accent block w-72 px-3 py-1 mt-4 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition  ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none sm:w-64">              
                <option selected>Elija una discusión para editar</option>
                { discussions.map((d,index) => (
                    <option key={index} value={JSON.stringify(d)}>{d.title}</option>
                   ))
                 }
            </select>  
            <div className="relative z-0 mt-3 mb-3 w-full group pr-5">
              <input type="text" value={_updateDiscussion.title} onChange={(e) => setUpdateDiscussion({ ..._updateDiscussion, title: e.target.value })} className="block py-2.5 px-0 w-[400px] text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer lg:w-full" placeholder=" " /> 
              <label className="absolute left-0 text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Título</label>
            </div>
            <div className="flex relative z-0 mt-3 mb-3 w-full group pr-5">
              <select value={_updateDiscussion.category} onChange={(e) => setUpdateDiscussion({..._updateDiscussion, category: e.target.value})} className="select select-accent block w-48 px-3 py-1 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition  ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none">              
                <option selected>Elija una categoría</option>
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
                data={ _updateDiscussion.body }
                onChange={ ( e, editor ) => {
                        const data = editor.getData();
                        setUpdateDiscussion({ ..._updateDiscussion, body: data})
                        } }
                    />
            </div>
          </div>
          <div className="">
            <button className="bg-blue-900 text-white px-4  py-1 rounded shadow-md focus:ring hover:bg-blue-500 transition-all  active:transform active:translate-y-1 sm:px-2 sm:text-sx" type="submit">
                Guardar
            </button>
            <button onClick={openModal} className="bg-blue-900 text-white px-4  py-1 ml-3 rounded shadow-md focus:ring hover:bg-blue-500 transition-all  active:transform active:translate-y-1 sm:px-2 sm:text-sx" type="button">
                {"Añadir votación"}
            </button>
          </div>
        </form>
        {openPoll && <AñadirVotacion options={options} question={question} setOptions={setOptions} setQuestion={setQuestion} setOpenPoll={setOpenPoll}/>}
    </div>
  )
}
