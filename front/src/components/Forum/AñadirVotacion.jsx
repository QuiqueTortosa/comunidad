import React, { useState, useEffect } from "react";
import * as FaIcons from "react-icons/fa";
import { useDispatch } from "react-redux";
import { addError } from "../../store/actions";

export default function AñadirVotacion({question, setQuestion, options, setOptions, setOpenPoll}) { 
  
  const dispatch = useDispatch()
    
  const addOption = () => {
    setOptions([...options, ""]); //Añadimos un elemento al array
  };


  const handleAnswer = (e, i) => {
    setOptions((o) => {
      return [
        ...o.slice(0, i), //El slice devuelve parte de un array
        (o[i] = e.target.value),
        ...o.slice(i + 1),
      ];
    });
  };

  const save = () => {
    if(question.length > 0) dispatch(addError(0,"Votación guardada"))
    setOpenPoll(false)
  }
  const clear = () => {
      dispatch(addError(1,"La votación no ha sido guardada"))
      setOpenPoll(false)
      setOptions(["",""])
      setQuestion("")
  }

  return (
    <div className="bg-opacity-70 bg-gray-800 fixed inset-0 z-30">
      <div className="flex h-screen justify-center items-center ">
      <div className="flex-col justify-center h-auto max-h-[75%]  overflow-x-auto bg-white py-12 px-24 border-4 border-sky-500 rounded-xl items-center w-auto sm:px-12">
            <div className="relative z-0 mb-6 w-full group">
                <input type="text" value={question} onChange={(e) => setQuestion(e.target.value)} name="question" className="block py-2.5 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                <label className="absolute left-0 text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Pregunta</label>
            </div>
            <div className="container">
                {options.map((option, i) => (
                    <div key={i} className="relative z-0 mb-6 w-full group">
                        <label className="absolute left-0 text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Opción</label>
                        <input type="text" key={i} value={option} onChange={(e) => handleAnswer(e, i)} name="question" className="block py-2.5 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                    </div>
                 ))}
             </div>
             <div className="flex gap-3">
                 <button className="bg-blue-900 text-white px-2  py-1 rounded shadow-md focus:ring hover:bg-blue-500 transition-all  active:transform active:translate-y-1" type="button" onClick={save}>
                    Guardar
                </button>
                <button className="bg-blue-900 text-white px-2  py-2 rounded shadow-md focus:ring hover:bg-blue-500 transition-all  active:transform active:translate-y-1" type="button" onClick={addOption}>
                    <FaIcons.FaPlus/>
                </button>
                <button className="bg-red-500 text-white px-2  py-2 rounded shadow-md focus:ring hover:bg-red-700 transition-all  active:transform active:translate-y-1" type="button" onClick={clear}>
                  <FaIcons.FaTrash/>
                </button>
             </div>
        </div>
      </div>
    </div>
  );
}
