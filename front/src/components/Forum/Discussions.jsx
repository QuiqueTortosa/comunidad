import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createDiscussion, deleteDiscussion, getDiscussions, updateDiscussion, getCategories, deleteCategory, createCategory } from "../../store/actions";

export default function Discussions() {

  const dispatch = useDispatch()
  const discussions = useSelector(state => state.DISCUSSIONS)
  const currentDiscusion = useSelector(state => state.DISCUSSIONS.filter(d => d._id == "626eda0ab4f03212a09affda"))[0]
  const categories = useSelector(state => state.CATEGORIES)

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
        <div>
        { categories.map(c => (
            <div className="flex flex-col w-full bg-cyan-900 my-2">
              <div className="flex flex-row justify-between">
                {c.name}
                <button onClick={() => {handleDeleteCategory(c._id)}}>Delete</button>
              </div>
              { discussions.map(d => {
                if(d.category === c.name){
                  return <div>{d.title}</div>
                }
              })

              }
            </div>
          ))
        }
        </div>
        <div>
          { discussions.map(d => (
            <div className="flex">
              {d.title}
              <div>
                <button onClick={() => handleDelete(d._id)}>Delete</button>
                <button onClick={() => handleUpdate()}>Update</button>
              </div>
            </div>
          ))

          }
        </div>
    </div>
  )
}
