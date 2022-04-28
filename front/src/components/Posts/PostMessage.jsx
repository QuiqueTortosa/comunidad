import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createMessage, getMessages, getPosts, removeReplyMessage, updateMessage } from "../../store/actions";
import decode from 'jwt-decode';
import cookie from "js-cookie";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const editorConfiguration = {
  toolbar: [ 'heading','bold', 'italic', 'blockQuote', 'undo', 'redo' ]
};


export default function PostMessage({reply, setReply, messageUpdate,setUpdateMessage, editar, setEditar}) {
  const { postId } = useParams();
  const dispatch = useDispatch();
  const [ messageData, setMessageData ] = useState({
    user: decode(cookie.get("token")).id,
    message: "",
    response: reply.message,
  })
  useEffect(() => {
    setMessageData({...messageData, response: reply.message})
    dispatch(getMessages(postId))
  },[reply.response,editar])

  console.log(messageUpdate)

  const handleSubmit = (e) => {
    console.log(reply.message)
    e.preventDefault()
    setMessageData({...messageData, response: reply.message})
    if(editar) {
      dispatch(updateMessage(messageUpdate.id, messageUpdate.body))
      setUpdateMessage({...messageUpdate, body: ""})
      setEditar(!editar)
    }else {
      dispatch(createMessage(postId,messageData))
      setMessageData({...messageData, message: "", response: ""})
    }
    dispatch(getMessages(postId))
    refresh()
  }

  const refresh = () => {
    setMessageData({
      user: decode(cookie.get("token")).id,
      message:"",
      response: reply.message,
    })
  }

  return (
    <div className="mt-5">
    <form autoComplete="off" onSubmit={handleSubmit}> 
      { reply.response != undefined &&
       <div className="mb-3">
          <p><strong>Respuesta a: </strong></p>
          <div dangerouslySetInnerHTML={{__html: reply.message}}></div>
        </div>
      }
      <div className="relative z-0 mb-6 w-full group">
      <CKEditor
                        editor={ ClassicEditor }
                        config={ editorConfiguration }
                        data={ editar ? messageUpdate.body : messageData.message }
                        onReady={ editor => {
                            // You can store the "editor" and use when it is needed.
                            console.log( 'Editor is ready to use!', editor );
                        } }
                        onChange={ ( e, editor ) => {
                            const data = editor.getData();
                            console.log( { e, editor, data } );
                            setMessageData({ ...messageData, message: data})
                            if(editar) setUpdateMessage({...messageUpdate, body: data})
                        } }
                        onBlur={ ( event, editor ) => {
                            console.log( 'Blur.', editor );
                        } }
                        onFocus={ ( event, editor ) => {
                            console.log( 'Focus.', editor );
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
