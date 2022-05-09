import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Poll from "../components/voting/Poll";
import { getPollBySearch, getPolls } from "../store/actions";
import { FaSearch } from 'react-icons/fa';


export default function PollPage() {
  const [showOngoing, setShowOngoing] = useState(0);
  const dispatch = useDispatch();
  const [search, setSearch] = useState('')
  let ongoingPolls = useSelector((state) =>
    state.VOTACIONES.filter((p) => p.status === 0)
  );
  let finishedPolls = useSelector((state) =>
    state.VOTACIONES.filter((p) => p.status === 1)
  );

  const searchPolls = (query) => {
    if(search.trim()){
        dispatch(getPollBySearch(search))
      }else {
        dispatch(getPolls())
      }
  }

  return (
    <div className="mx-7 my-4 sm:mx-2">
      <div className="mb-4">
        <h1 className="text-3xl font-bold italic font-extrabold">Votaciones</h1>
      </div>
      <div className="flex flex-row justify-between mb-4 lg:flex-col">
        <div className="flex flex-row gap-4">
          <button
            className="bg-blue-900 text-white px-4  py-1 rounded shadow-md focus:ring hover:bg-blue-500 transition-all  active:transform active:translate-y-1"
            onClick={() => {
              setShowOngoing(0);
            }}
          >
            En curso
          </button>
          <button
            className="bg-blue-900 text-white px-4  py-1 rounded shadow-md focus:ring hover:bg-blue-500 transition-all  active:transform active:translate-y-1"
            onClick={() => {
              setShowOngoing(1);
            }}
          >
          Finalizadas
        </button>
       </div>
       <div className="mr-2 lg:mt-3">
          <input 
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar..."
            className="rounded p-1"
          >
          </input>
          <button 
            className="bg-blue-900 text-white px-4 py-[8px] rounded shadow-md focus:ring hover:bg-blue-500 transition-all  active:transform active:translate-y-1"
            onClick={searchPolls}>
            <FaSearch></FaSearch>
          </button>
        </div>
      </div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-400">
          <thead className="text-xs text-gray-400 uppercase bg-gray-700">
            <tr>
              <th scope="col" className="py-3 text-center">
                Nombre
              </th>
              <th scope="col" className="py-3 text-center sm:hidden">
                Opciones
              </th>
              <th scope="col" className="py-3 text-center">
                Participantes
              </th>
              <th scope="col" className="py-3 text-center">
                Estado
              </th>
              <th scope="col" className="py-3 text-center">
          
              </th>
            </tr>
          </thead>
          {showOngoing === 0 ? (
          <>
            {ongoingPolls.reverse().map((poll) => (
              <Poll key={poll._id} poll={poll}/>
            ))}
          </>
        ) : (
          <>
            {finishedPolls.reverse().map((poll) => (
              <Poll key={poll._id} poll={poll}/>
            ))}
          </>
        )}
        </table>
      </div>
    </div>
  );
}
