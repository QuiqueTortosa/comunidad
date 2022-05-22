import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createDiscussionMessage, getDiscussionMessages, updateDiscussionMessage } from "../../../store/actions";
import decode from 'jwt-decode';
import cookie from "js-cookie";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import "../forum.css"

const editorConfiguration = {
  toolbar: [ 'heading','bold', 'italic','underline','fontColor','link','insertTable','uploadImage','undo', 'redo' ],
  ckfinder: {
    uploadUrl: 'http://localhost:4000/uploads'
  }
};


export default function DiscussionMessage({reply, setReply, messageUpdate,setUpdateMessage, editar, setEditar}) {
  const { discId } = useParams();
  const dispatch = useDispatch();
  const [ messageData, setMessageData ] = useState({
    user: decode(cookie.get("token")).id,
    message: "",
    response: reply._id,
  })
  useEffect(() => {
    setMessageData({...messageData, response: reply._id})
    dispatch(getDiscussionMessages(discId))
  },[reply._id,editar])


  const handleSubmit = (e) => {
    e.preventDefault()
    setMessageData({...messageData, response: reply._id})
    if(editar) {
      dispatch(updateDiscussionMessage(messageUpdate.id, messageUpdate.message))
      setUpdateMessage({...messageUpdate, message: ""})
      setEditar(!editar)
    }else {
      dispatch(createDiscussionMessage(discId,messageData))
      setMessageData({...messageData, message: "", response: ""})
    }
    dispatch(getDiscussionMessages(discId))
    refresh()
  }

  const refresh = () => {
    setMessageData({
      user: decode(cookie.get("token")).id,
      message:"",
      response: reply._id,
    })
  }

  return (
    <div className="mt-5 bg-white p-3 rounded-2xl">
    <form autoComplete="off" onSubmit={handleSubmit}> 
      { reply.message &&
       <div id="texto" className="mb-3">
          <p><strong>Respuesta a {reply.response ? reply.response.user.username : ""}: </strong></p>
          <div dangerouslySetInnerHTML={{__html: reply.message}}></div>
        </div>
      }
      <div className="relative z-0 mb-6 w-full group">
      <CKEditor
                        editor={ ClassicEditor }
                        config={ editorConfiguration }
                        data={ editar ? messageUpdate.body : messageData.message }
                        onChange={ ( e, editor ) => {
                            const data = editor.getData();
                            setMessageData({ ...messageData, message: data})
                            if(editar) setUpdateMessage({...messageUpdate, message: data})
                        } }
                    />
      </div>
      <div className="flex flex-row gap-5">
        <button className="bg-blue-900 text-white px-4  py-1 rounded shadow-md focus:ring hover:bg-blue-500 transition-all  active:transform active:translate-y-1">
          {editar ? "Editar" : "Publicar"}
        </button>
        { !editar ?
          <button  type="button" className="bg-red-600 text-white px-4  py-1 rounded shadow-md focus:ring hover:bg-red-500 transition-all  active:transform active:translate-y-1" onClick={() => {setReply({})}}>
          Eliminar cita
         </button>
         :
         <button  type="button" className="bg-red-600 text-white px-4  py-1 rounded shadow-md focus:ring hover:bg-red-500 transition-all  active:transform active:translate-y-1" onClick={() => {setEditar(!editar)}}>
           Cancelar
        </button>
        }   
      </div>
      </form>
    </div>
  )
}