import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getCurrentPoll, changeVoteStatus, deletePoll } from "../../store/actions";
import { useSelector, useDispatch } from "react-redux";

export default function Poll({ poll, remove }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAdmin = useSelector(state=>state.auth.user.roles.find(r => r.name == "admin") ? true : false)
  const isMod = useSelector(state=>state.auth.user.roles.find(r => r.name == "mod") ? true : false)
  const restart = {
    status: 0
  };
  const finish = {
    status: 1
  };
  const handleSelect = (id) => {
    dispatch(getCurrentPoll(id));
    navigate(`${poll._id}`);
  };  

  const handleChangeStatus = (id,status) => {
    dispatch(changeVoteStatus(id,status));
  }

  const handleRemove = (id) => {
    dispatch(deletePoll(id));
  };  

  return (
    <>
    { poll.status == 0 ?
      <li className="space-x-5 m-2 flex flex-row items-center">
        <div>{poll.question}</div>
        <button 
          className="bg-blue-900 text-white px-4  py-1 rounded shadow-md focus:ring hover:bg-blue-500 transition-all  active:transform active:translate-y-1"
          onClick={() => handleSelect(poll._id)}>
            Ir
          </button>
        {(isAdmin || isMod) && 
          <button 
            className="bg-blue-900 text-white px-4  py-1 rounded shadow-md focus:ring hover:bg-blue-500 transition-all  active:transform active:translate-y-1"
            onClick={() => handleChangeStatus(poll._id,finish)}>
              Finalizar
            </button>
          }
      </li>
      :
      <li className="space-x-5 m-2 flex flex-row items-center">
        <div>{poll.question}</div>
        <button 
          className="bg-blue-900 text-white px-4  py-1 rounded shadow-md focus:ring hover:bg-blue-500 transition-all  active:transform active:translate-y-1"
          onClick={() => handleSelect(poll._id)}>
            Ir
          </button>
      {(isAdmin || isMod) && 
         <button 
         className="bg-blue-900 text-white px-4  py-1 rounded shadow-md focus:ring hover:bg-blue-500 transition-all  active:transform active:translate-y-1"
         onClick={() => handleChangeStatus(poll._id,restart)}>
            Retomar
        </button>
      }
      {(isAdmin || isMod) && 
        <button 
          className="bg-red-600 text-white px-4  py-1 rounded shadow-md focus:ring hover:bg-red-500 transition-all  active:transform active:translate-y-1"
          onClick={() => handleRemove(poll._id)}>
            Eliminar
        </button>
        }
    </li>
  }
    </>
  );
}

