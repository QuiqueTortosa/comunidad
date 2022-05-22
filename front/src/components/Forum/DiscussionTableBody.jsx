import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteDiscussion, getDiscussionMessages } from "../../store/actions";
import * as FaIcons from "react-icons/fa";

export default function DiscussionTableBody({d, isAdmin, isMod}) {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [confirmDelete, setConfirmDelete] = useState(false)

    const handleDelete = (id) => {
        setConfirmDelete(false)
        dispatch(deleteDiscussion(id))
      }
      const handleSelect = (id) => {
        dispatch(getDiscussionMessages(id));
        navigate(`${id}`);
      }
  return (
    <tbody>
        <tr className="bg-gray-700 border-gray-800 text-white hover:bg-gray-600 border-b">
        <td>
        <div onClick={() => handleSelect(d._id)} className="flex text-center justify-start items-center px-4 cursor-pointer hover:text-slate-300">
            <FaIcons.FaComments className="px-1 w-7 h-7"/>
            {d.title}
            </div>
        </td>
        <td className="py-4 text-center sm:hidden">
            {d.messages.length}
        </td>
        <td className="flex flex-col items-center py-1 text-center">
            {
            d.user ? 
            <>
            <img className="rounded-full w-8 h-8 mx-2" src={d.user.selectedFile ? d.user.selectedFile.length > 2 ? d.user.selectedFile : "/images/avatar.png" : "/images/avatar.png"}></img>
            <p className="text-sm text-center">{d.user.username ? d.user.username.split(" ")[0] : "Usuario"}</p>
            </>
            :
            <>
                <img className="rounded-full w-8 h-8 mx-2" src="/images/avatar.png"></img>
                <p className="text-[10px] text-center">Usuario Eliminado</p>
            </>
            }
        </td>
        <td className="py-4 text-center text-xs">
            {d.createdAt ? d.createdAt.substring(11,16) : ""}
            <br/>
            {d.createdAt ? d.createdAt.substring(0,10) : ""}
        </td>
        { (isAdmin) &&
            <td className="py-1">
            <div className="flex flex-col items-center">
                <button onClick={() => setConfirmDelete(true)} className="font-medium text-red-500 hover:text-red-200 mt-3"><FaIcons.FaTrash/></button>
            </div>
            </td>
        }   
    </tr>
    { confirmDelete &&
        <div className="bg-opacity-70 bg-gray-800 fixed inset-0 z-30">
          <div className="flex h-screen justify-center items-center ">
            <div className="flex-col justify-center  bg-white py-12 px-12 border-4 border-sky-900 rounded-xl items-center">
            <p className="text-black">¿Estas seguro de eliminar la {d.title}?</p>
            <div className="flex justify-evenly mt-4">
              <button onClick={() =>  handleDelete(d._id)} className="bg-red-600 text-white px-4  py-2 rounded shadow-md focus:ring hover:bg-red-500 transition-all  active:transform active:translate-y-1">
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
</tbody>
  )
}
