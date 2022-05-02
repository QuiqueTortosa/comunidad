import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createDiscussion, deleteDiscussion, getDiscussions, updateDiscussion, getCategories, deleteCategory, createCategory, getDiscussionMessages } from "../../store/actions";
import * as FaIcons from "react-icons/fa";

export default function Discussions() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const discussions = useSelector(state => state.DISCUSSIONS)
  const currentDiscusion = useSelector(state => state.DISCUSSIONS.filter(d => d._id == "626eda0ab4f03212a09affda"))[0]
  const categories = useSelector(state => state.CATEGORIES)
  const isAdmin = useSelector(state=>state.auth.user.roles.find(r => r.name == "admin") ? true : false)
  const isMod = useSelector(state=>state.auth.user.roles.find(r => r.name == "moderator") ? true : false)

  console.log(discussions)

  const [update, setUpdate] = useState(false)

  const [newDiscussion, setNewDiscussion] = useState({
    title: "",
    body: "",
    category: ""
  })

  const [newCategory, setNewCategory] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    if(update){
      dispatch(updateDiscussion("626eda0ab4f03212a09affda", newDiscussion))
      dispatch(getDiscussions())
    }else {
      dispatch(createDiscussion(newDiscussion))
      dispatch(getDiscussions())
    }
  }

  const handleDelete = (id) => {
    dispatch(deleteDiscussion(id))
  }

  const handleDeleteCategory = (id) => {
    dispatch(deleteCategory(id))
  }

  const handleUpdate = () => {
    console.log(currentDiscusion)
    setNewDiscussion({
      title: currentDiscusion.title,
      body: currentDiscusion.body
    })
    setUpdate(!update)
  }

  const handleCategory = (e) => {
    e.preventDefault()
    dispatch(createCategory(newCategory))
    dispatch(getCategories())
  }

  const handleSelect = (id) => {
    dispatch(getDiscussionMessages(id));
    navigate(`${id}`);
  }

  return (
    <div>
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
          <div className="flex flex-row">
            <div className="relative z-0 mt-3 mb-3 w-full group pr-5">
              <input type="text" value={newDiscussion.title} onChange={(e) => setNewDiscussion({ ...newDiscussion, title: e.target.value })} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " /> 
              <label className="absolute left-0 text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Título</label>
            </div>
            <div className="relative z-0 mt-3 mb-3 w-full group pr-5">
              <input type="text" value={newDiscussion.body} onChange={(e) => setNewDiscussion({ ...newDiscussion, body: e.target.value })} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " /> 
              <label className="absolute left-0 text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Mensaje</label>
            </div>
            <div className="relative z-0 mt-3 mb-3 w-full group pr-5">
              <input type="text" value={newDiscussion.category} onChange={(e) => setNewDiscussion({ ...newDiscussion, category: e.target.value })} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " /> 
              <label className="absolute left-0 text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Categoria</label>
            </div>
          </div>
          <div className="mt-3">
            <button className="bg-blue-900 text-white px-4  py-1 rounded shadow-md focus:ring hover:bg-blue-500 transition-all  active:transform active:translate-y-1" type="submit">
                {update ? "Actualizar" : "Guardar"}
            </button>
          </div>
        </form>
        <div className="py-2">
        { categories.map(c => (
            <table className="w-full text-sm text-left text-gray-400">
              <thead class="text-xs text-gray-400 bg-gray-800">
                <tr>
                  <th scope="col" class="w-6/12 py-3 px-6 text-start">
                    {c.name}
                  </th>
                  <th scope="col" class="w-1/6 py-3 text-center">
                    Respuestas
                  </th>
                  <th scope="col" class="w-[100px] py-3 text-center">
                    Último Mensaje
                  </th>
                  <th scope="col" class="w-[75px] py-3 text-center">
                    Fecha
                  </th>
                  { (isAdmin || isMod) &&
                    <th scope="col" class="py-3 w-[50px] text-center">
                      <button onClick={() => {handleDeleteCategory(c._id)}}>Delete</button>
                    </th>
                  } 
                </tr>
              </thead>
              { discussions.map(d => {
                if(d.category === c.name){
                  return (
                    <tbody>
                      <tr className="bg-gray-700 border-gray-800 text-white hover:bg-gray-600 border-b">
                       <td>
                         <div onClick={() => handleSelect(d._id)} className="flex text-center justify-start items-center px-4 cursor-pointer hover:text-slate-300">
                           <FaIcons.FaComments className="px-1 w-7 h-7"/>
                            {d.title}
                          </div>
                        </td>
                        <td className="py-4 text-center">
                          {d.messages.length}
                        </td>
                        <td className="flex flex-col items-center py-1 text-center">
                          <img className="rounded-full w-8 h-8 mx-2" src={d.user.selectedFile.length > 2 ? d.user.selectedFile : "/images/avatar.png"}></img>
                          <p className="text-sm text-center">{d.user.username.split(" ")[0]}</p>
                        </td>
                        <td className="py-4 text-center text-xs">
                          {d.createdAt.substring(11,16)}
                          <br/>
                          {d.createdAt.substring(0,10)}
                        </td>
                        { (isAdmin || isMod) &&
                          <td className="py-1">
                            <div className="flex flex-col">
                              <button onClick={() => handleDelete(d._id)}>Delete</button>
                              <button onClick={() => handleUpdate()}>Update</button>
                          </div>
                          </td>
                        }   
                      </tr>
                  </tbody>
                    )
                }
              })

              }             
            </table>
          ))
        }
        </div>
    </div>
  )
}
