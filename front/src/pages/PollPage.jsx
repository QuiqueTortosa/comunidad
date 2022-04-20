import React, { useState } from "react";
import ErrorMessage from "../components/ErrorMessage";
import { useSelector, useDispatch } from "react-redux";
import Poll from "../components/voting/Poll";
import { getUsers } from "../store/actions";


export default function PollPage() {
  const [showOngoing, setShowOngoing] = useState(0)
  const dispatch = useDispatch()
  let ongoingPolls = useSelector((state) => state.VOTACIONES.filter(p => p.status == 0));
  let finishedPolls = useSelector((state) => state.VOTACIONES.filter(p => p.status == 1));
  
  console.log(ongoingPolls);
  console.log(finishedPolls);
  
  return (
    <div>
      <div className="space-x-2">
        <button 
          className="bg-blue-900 text-white px-4  py-1 rounded shadow-md focus:ring hover:bg-blue-500 transition-all  active:transform active:translate-y-1"
          onClick={() => {setShowOngoing(0)}}>
            En curso
        </button>
        <button 
          className="bg-blue-900 text-white px-4  py-1 rounded shadow-md focus:ring hover:bg-blue-500 transition-all  active:transform active:translate-y-1"
          onClick={() => {setShowOngoing(1)}}>
          Finalizadas
        </button>
      </div>
      { showOngoing == 0 ?
        <ul>
          {ongoingPolls.map((poll) => (
            <Poll key={poll._id} poll={poll} />
          ))}
        </ul>
      :
        <ul>
        {finishedPolls.map((poll) => (
          <Poll key={poll._id} poll={poll} />
        ))}
       </ul>
      }
      <div>
      </div>
      <ErrorMessage />
    </div>
  );
}
