import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDiscussions, getCategories, getDiscussionsBySearch } from "../../store/actions";
import * as FaIcons from "react-icons/fa";
import DiscussionTableBody from "./DiscussionTableBody.jsx";
import DiscussionTableHead from "./DiscussionTableHead";

export default function Discussions() {
  const dispatch = useDispatch()
  const discussions = useSelector(state => state.DISCUSSIONS)
  const categories = useSelector(state => state.CATEGORIES)
  const isAdmin = useSelector(state=>state.auth.user.roles.find(r => r.name == "admin") ? true : false)
  const isMod = useSelector(state=>state.auth.user.roles.find(r => r.name == "moderator") ? true : false)
  const [search, setSearch] = useState('')
  
  console.log(discussions)

  useEffect(() => {
    if(search.length == 0) dispatch(getDiscussions())
    else dispatch(getDiscussionsBySearch(search))
    dispatch(getCategories())
  }, [discussions.length, categories.length])
  console.log(discussions[discussions.length-1])

  const [update, setUpdate] = useState(false)

  const searchDiscs = (query) => {
    if(search.trim()){
        console.log(search)
        dispatch(getDiscussionsBySearch(search))
      }else {
        dispatch(getDiscussions())
      }
  }

  return (
    <div>
      <div className="flex justify-between my-2">
          <div className="sm:text-center">
            <h1 className="text-3xl font-bold italic font-extrabold">Foro</h1>
          </div>
          <div className="flex justify-end sm:text-right sm:mt-3">
            <input  
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar..."
              className="rounded p-1 sm:w-36"
            >
            </input>
            <button 
              className="bg-blue-900 text-white px-4 py-[8px] rounded shadow-md focus:ring hover:bg-blue-500 transition-all  active:transform active:translate-y-1"
              onClick={searchDiscs}>
              <FaIcons.FaSearch/>
            </button>
          </div>
        </div>
        <div className="py-2">
        { categories.map(c => (
            <table className="w-full text-sm text-left text-gray-400">
            <DiscussionTableHead c={c} isAdmin={isAdmin} isMod={isMod}/>
              { discussions.map(d => {
                if(d.category === c.name){
                  return (
                      <DiscussionTableBody d={d} isAdmin={isAdmin} isMod={isMod}/>
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
