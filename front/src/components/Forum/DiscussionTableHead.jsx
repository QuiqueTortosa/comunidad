import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteCategory } from "../../store/actions";
import * as FaIcons from "react-icons/fa";

export default function DiscussionTableHead({c,isAdmin, isMod}) {
    const dispatch = useDispatch()

    const [confirmDelete, setConfirmDelete] = useState(false)

    const handleDeleteCategory = (id) => {
        setConfirmDelete(false)
        dispatch(deleteCategory(id))
      }

  return (
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
        { (isAdmin) &&
            <th scope="col" class="py-3 w-[50px] text-center">
            <button onClick={() => setConfirmDelete(true)} className="font-medium text-red-500 hover:text-red-200 mt-3"><FaIcons.FaTrash/></button>
            </th>
        } 
        </tr>
        { confirmDelete &&
        <div className="bg-opacity-70 bg-gray-800 fixed inset-0 z-30">
          <div className="flex h-screen justify-center items-center ">
            <div className="flex-col justify-center  bg-white py-12 px-12 border-4 border-sky-900 rounded-xl items-center">
            <p className="text-black">¿Estas seguro de eliminar la {c.name}?</p>
            <div className="flex justify-evenly mt-4">
              <button onClick={() =>  handleDeleteCategory(c._id)} className="bg-red-600 text-white px-4  py-2 rounded shadow-md focus:ring hover:bg-red-500 transition-all  active:transform active:translate-y-1">
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
    </thead>
  )
}
