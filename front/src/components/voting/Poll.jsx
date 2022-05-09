import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getCurrentPoll,
  changeVoteStatus,
  deletePoll,
} from "../../store/actions";
import { useSelector, useDispatch } from "react-redux";
import * as FaIcons from "react-icons/fa";

export default function Poll({ poll }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAdmin = useSelector((state) =>
    state.auth.user.roles.find((r) => r.name == "admin") ? true : false
  );
  const isMod = useSelector((state) =>
    state.auth.user.roles.find((r) => r.name == "moderator") ? true : false
  );
  const restart = {
    status: 0,
  };
  const finish = {
    status: 1,
  };

  const [confirmDelete, setConfirmDelete] = useState(false)


  const handleSelect = (id) => {
    dispatch(getCurrentPoll(id));
    navigate(`${poll._id}`);
  };

  const handleChangeStatus = (id, status) => {
    dispatch(changeVoteStatus(id, status));
  };

  const handleRemove = (id) => {
    setConfirmDelete(false)
    dispatch(deletePoll(id));
  };

  return (
    <>
      {poll.status == 0 ? (
        <tbody>
          <tr className="bg-gray-800 border-gray-700 hover:bg-gray-600 border-b">
            <th
              scope="row"
              className="py-4 text-center font-medium text-white whitespace-nowrap  sm:hidden"
            >
              {poll.question.length > 15 ? poll.question.substring(0,15)+"..." : poll.question}
            </th>
            <th
              scope="row"
              className="py-4 text-center font-medium text-white whitespace-nowrap hidden sm:flex sm:justify-center"
            >
              {poll.question.substring(0,7)}...
            </th>
            <td className="py-4 text-center sm:hidden">{poll.options.length}</td>
            <td className="py-4 text-center">{poll.voted.length}</td>
            <td className="py-4 ">
              <div className="flex flex-col text-center justify-items-center justify-center">
                {poll.status == 0 ? "En curso" : "Finalizada"}
                {(isAdmin || isMod) && (
                  <div
                    className="flex text-center pt-1 justify-center cursor-pointer"
                    onClick={() => handleChangeStatus(poll._id, finish)}
                  >
                    <FaIcons.FaExchangeAlt />
                  </div>
                )}
              </div>
            </td>
            <td className="py-4 text-center">
              <button onClick={() => handleSelect(poll._id)} className="font-medium text-blue-600">
                <FaIcons.FaForward/>
              </button>
            </td>
          </tr>
        </tbody>
      ) : (
        <tbody>
          <tr className="bg-gray-800 border-gray-700 hover:bg-gray-600 border-b">
            <th
              scope="row"
              className="py-4 text-center font-medium text-white whitespace-nowrap"
            >
              {poll.question}
            </th>
            <td className="py-4 text-center">{poll.options.length}</td>
            <td className="py-4 text-center">{poll.voted.length}</td>
            <td className="py-4 ">
              <div className="flex flex-col text-center justify-items-center justify-center">
                {poll.status == 0 ? "En curso" : "Finalizada"}
                {(isAdmin || isMod) && (
                  <div
                    className="flex text-center pt-1 justify-center cursor-pointer"
                    onClick={() => handleChangeStatus(poll._id, restart)}
                  >
                    <FaIcons.FaExchangeAlt />
                  </div>
                )}
              </div>
            </td>
            <td className="py-4 text-center">
              <div className="flex flex-col gap-3">
                <button onClick={() => handleSelect(poll._id)} className="font-medium text-blue-600">
                  <FaIcons.FaForward/>
                </button>
               {(isAdmin) &&
                <button onClick={() => setConfirmDelete(true)} className="font-medium text-red-500 hover:text-red-200 mt-3">
                    <FaIcons.FaTrash/>
                  </button>
                }
              </div>
            </td>
          </tr>
        </tbody>
      )}
      { confirmDelete &&
        <div className="bg-opacity-70 bg-gray-800 fixed inset-0 z-30">
          <div className="flex h-screen justify-center items-center ">
            <div className="flex-col justify-center  bg-white py-12 px-12 border-4 border-sky-900 rounded-xl items-center">
            <p className="text-black">¿Estas seguro de eliminar la votación?</p>
            <div className="flex justify-evenly mt-4">
              <button onClick={() =>  handleRemove(poll._id)} className="bg-red-600 text-white px-4  py-2 rounded shadow-md focus:ring hover:bg-red-500 transition-all  active:transform active:translate-y-1">
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
    </>
  );
}
