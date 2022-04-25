import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  getCurrentPoll,
  changeVoteStatus,
  deletePoll,
} from "../../store/actions";
import { useSelector, useDispatch } from "react-redux";
import * as FaIcons from "react-icons/fa";

export default function Poll({ poll, remove }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAdmin = useSelector((state) =>
    state.auth.user.roles.find((r) => r.name == "admin") ? true : false
  );
  const isMod = useSelector((state) =>
    state.auth.user.roles.find((r) => r.name == "mod") ? true : false
  );
  const restart = {
    status: 0,
  };
  const finish = {
    status: 1,
  };
  const handleSelect = (id) => {
    dispatch(getCurrentPoll(id));
    navigate(`${poll._id}`);
  };

  const handleChangeStatus = (id, status) => {
    dispatch(changeVoteStatus(id, status));
  };

  const handleRemove = (id) => {
    dispatch(deletePoll(id));
  };

  return (
    <>
      {poll.status == 0 ? (
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
                <button onClick={() => handleRemove(poll._id)} className="font-medium text-red-500 hover:text-red-200 mt-3">
                  <FaIcons.FaTrash/>
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      )}
    </>
  );
}
