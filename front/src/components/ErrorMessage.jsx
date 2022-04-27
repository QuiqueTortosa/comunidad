import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { removeError } from '../store/actions';
import * as FaIcons from "react-icons/fa";

export default function ErrorMessage(){
  const dispatch = useDispatch()
  let error = useSelector(state => state.error)
  useEffect(() => {
    setTimeout(() => {
      dispatch(removeError())
    }, 5000);
  }, []); 

  const closeWarning = () => {
    dispatch(removeError())
  }
  console.log(error)
  return (<>
    {error.message && 
      <div class={`fixed right-7 flex p-4 mt-4 ${error.type == 1 ? "bg-red-200" : "bg-green-100"} bg-red-200 rounded-lg z-40`}>
        <div class={`flex-shrink-0 w-5 h-5 ${error.type == 1 ? "text-red-700" : "text-green-700"}`}>
          {error.type == 1 ? <FaIcons.FaExclamation/> : <FaIcons.FaCheck/>}
        </div>
        <div class={`ml-3 text-sm font-medium ${error.type == 1 ? "text-red-700" : "text-green-700"}`}>
            {error.message}
        </div>
        <button type="button" onClick={closeWarning}  className={`-mx-1.5 -my-1.5 ml-2 ${error.type == 1 ? "bg-red-600 text-red-200 focus:ring-red-400 p-1.5 hover:bg-red-800" : "bg-green-100 text-green-500 focus:ring-green-400 p-1.5 hover:bg-green-200"} rounded-lg focus:ring-2 inline-flex h-8 w-8`}>
          <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
        </button>
      </div>
    }
  </>
)};
